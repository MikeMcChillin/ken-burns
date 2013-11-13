$ ->
	img = new Image
	image = $("#image")
	mask = $("#mask")
	container = $("#container")

	# Since we're moving an image, let's actually apply it to our mask's bg image
	updateBackgroundPosition = (dragEvent, draggieInstance, event, pointer) ->
		position = draggieInstance.position
		mask.css
			"background-position": position.x + "px " + position.y + "px"
		currentBackgroundPosition()

	currentBackgroundPosition = ->
		$("#background-position").text("background-position: " + mask.css("background-position"))

	#########################
	# Button actions
	#########################
	$("#animate").click (e) ->
		e.preventDefault()
		mask.toggleClass "animate"
		image.toggleClass "hidden"

	anim = CSSAnimations.create("ken-burns")	
	$("#start").click (e) ->
		e.preventDefault()
		startPosition = $("#mask").css("background-position")
		anim.setKeyframe "0%",
		  "background-position": startPosition
		$("#start-value").text( "0% {background-position: " + startPosition + "}")

	$("#middle").click (e) ->
		e.preventDefault()
		midPosition = $("#mask").css("background-position")
		# anim = CSSAnimations.get("ken-burns")
		anim.setKeyframe "50%",
		  "background-position": midPosition
		$("#middle-value").text( "50% {background-position: " + midPosition + "}")  
		
	$("#end").click (e) ->
		e.preventDefault()
		endPosition = $("#mask").css("background-position")
		# anim = CSSAnimations.get("ken-burns")
		anim.setKeyframe "100%",
		  "background-position": endPosition
		$("#end-value").text( "100% {background-position: " + endPosition + "}")

	$("#mask-submit").on "click", (e) ->
		e.preventDefault()
		$(".mask-size-input").addClass "hidden"
		$(".upload").removeClass "hidden"



	#########################
	# Drag & drop
	#########################
	opts = on:
		load: (e, file) ->
			if file.type.match(/image/)			

				# Create the image, set the src and add an id
				img = new Image()
				img.src = e.target.result
				img.id = "image"

				img.onload = ->
					mask.append(img)				


				#########################
				# Have to make sure that newly inserted image is ready
				# Now that we have an image, make some calculations
				#########################
				container.imagesLoaded ->
					image = $("#image")
					imageWidth = image.width()
					imageHeight = image.height()

					$("#image-width-placeholder").text(imageWidth)
					$("#image-height-placeholder").text(imageHeight)

					# maskWidth = image.width() / 2
					maskWidth = $("#mask-width-input").val()
					# maskHeight = image.height() / 2
					maskHeight = $("#mask-height-input").val()

					# Dupe the image as a background-image on mask
					dupeImage = ->
						source = $("#image").attr("src")
						mask.css("background", "url(" + source + ")")
						mask.css("background-repeat", "no-repeat")
					dupeImage()

					setMaskDimensions = ->
						mask.css
							"width": maskWidth
							"height": maskHeight
					setMaskDimensions()

					setContainerDimensions = ->
						container.css
							"width": (imageWidth - maskWidth) + imageWidth
							"height": (imageHeight - maskHeight) + imageHeight
					setContainerDimensions()

					positionMask = ->
						mask.css
							"left": "50%"
							"top": "50%"
							"margin-left": -0.5*maskWidth
							"margin-top": -0.5*maskHeight
					
					positionMask()

					#########################
					# Initiate dragabilly
					#########################
					demo = document.querySelector("#mask")
					elem = demo.querySelector("img")
					draggie = new Draggabilly(elem, 
						containment: "#container"
					)
					output = demo.querySelector("code")
					draggie.on "dragStart", (draggieInstance, event, pointer) ->
						updateBackgroundPosition "DRAG START", draggieInstance, event, pointer

					draggie.on "dragMove", (draggieInstance, event, pointer) ->
						updateBackgroundPosition "DRAG MOVE", draggieInstance, event, pointer

					draggie.on "dragEnd", (draggieInstance, event, pointer) ->
						updateBackgroundPosition "DRAG END", draggieInstance, event, pointer

				
					$(".animation-hold").addClass "visible"
				
	# Call drag & drop
	$("body").fileReaderJS(opts)



	###################################
	# Inputs
	###################################

	initialInputs = ->
		$(".change").each ->
			value = $(this).val()
			prop = $(this).data("property")
			# Apply to mask
			mask.css( prop, value)
		$("select").on "change", ->
			value = $(this).val()
			prop = $(this).data("property")
			mask.css( prop, value )
		container.imagesLoaded ->
			$("#mask-width-value").val(mask.width())
			$("#mask-height-value").val(mask.height())
			
	initialInputs()

	# Listen to the text inputs and update the values
	$(".change").on "change", ->
		value = $(this).val()
		prop = $(this).data("property")
		# Apply to mask
		mask.css( prop, value)

	$("select").on "change", ->
		value = $(this).val()
		prop = $(this).data("property")
		mask.css( prop, value )
		# console.log value

	# Update the mask width & height when changing the input text
	# $("#mask-width-value").on "change", ->
	# 	maskWidth = $(this).val()
	# 	mask.css("width", maskWidth)
	# 	# update the size of the container
	# 	updateContainerWidth(maskWidth)
	# $("#mask-height-value").on "change", ->
	# 	maskHeight = $(this).val()
	# 	mask.css("height", maskHeight)
	# 	# update the size of the container
	# 	updateContainerHeight(maskHeight)
		
	updateContainerWidth = (maskWidth) ->
		imageWidth = image.width()
		container.css("width", imageWidth + maskWidth)
		draggie.enable()
	updateContainerHeight = (maskHeight) ->
		imageHeight = image.height()
		container.css("height", imageHeight + maskHeight)




	####################
	# Draw the mask
	####################

	# selection = mask.addClass("selection-box")
	# container.on "mousedown", (e) ->
	# 	click_y = e.pageY
	# 	click_x = e.pageX
	# 	selection.css
	# 		top: click_y
	# 		left: click_x
	# 		width: 0
	# 		height: 0

	# 	selection.appendTo container
	# 	container.on("mousemove", (e) ->
	# 		move_x = e.pageX
	# 		move_y = e.pageY
	# 		width = Math.abs(move_x - click_x)
	# 		height = Math.abs(move_y - click_y)
	# 		new_x = undefined
	# 		new_y = undefined
	# 		new_x = (if (move_x < click_x) then (click_x - width) else click_x)
	# 		new_y = (if (move_y < click_y) then (click_y - height) else click_y)
	# 		selection.css
	# 			width: width
	# 			height: height
	# 			top: new_y
	# 			left: new_x

	# 		console.log $selection.css()
	# 	).on "mouseup", (e) ->
	# 		container.off "mousemove"
	# 		# selection.remove()
