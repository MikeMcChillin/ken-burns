$ ->
	img = new Image
	image = $("#image")
	mask = $("#mask")
	container = $("#container")
	# img.src = image.css("background-image").replace(/url\(|\)$/g, "")
	# Make sure image is loaded before starting any width/height calculations.
	container.imagesLoaded ->

		imageWidth = image.width()
		imageHeight = image.height()

		maskWidth = image.width() / 2
		maskHeight = image.height() / 2

		setMaskDimensions = ->
			mask.css
				"width": maskWidth
				"height": maskHeight
		setMaskDimensions()

		setContainerDimensions = ->
			container.css
				"width": imageWidth + maskWidth
				"height": imageHeight + maskHeight
		setContainerDimensions()

		positionMask = ->
			mask.css
				"left": "50%"
				"top": "50%"
				"margin-left": -0.5*maskWidth
				"margin-top": -0.5*maskHeight
		
		positionMask()
	


	# Since we're moving an image, let's actually apply it to our mask's bg image
	updateBackgroundPosition = (dragEvent, draggieInstance, event, pointer) ->
		position = draggieInstance.position
		mask.css
			"background-position": position.x + "px " + position.y + "px"
		currentBackgroundPosition()

		# For testing purposes only
		#message = dragEvent + "\n" + event.type + " at " + pointer.pageX + ", " + pointer.pageY + "\n" + "draggie position at " + position.x + ", " + position.y
		#$("#wef").text(message)



		
		
	demo = document.querySelector("#mask")
	elem = demo.querySelector("#image")
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



	currentBackgroundPosition = ->
		$("#background-position").text("background-position: " + mask.css("background-position"))



	$("#animate").click (e) ->
		e.preventDefault()
		mask.toggleClass "animate"
		image.toggleClass "hidden"

	$("#start").click (e) ->
		e.preventDefault()
		startPosition = $("#mask").css("background-position")
		anim = CSSAnimations.get("ken-burns")
		anim.setKeyframe "0%",
		  "background-position": startPosition
		$("#start-value").text( "0% {background-position: " + startPosition + "}")

	$("#middle").click (e) ->
		e.preventDefault()
		midPosition = $("#mask").css("background-position")
		anim = CSSAnimations.get("ken-burns")
		anim.setKeyframe "50%",
		  "background-position": midPosition
		$("#middle-value").text( "50% {background-position: " + midPosition + "}")  
		
	$("#end").click (e) ->
		e.preventDefault()
		endPosition = $("#mask").css("background-position")
		anim = CSSAnimations.get("ken-burns")
		anim.setKeyframe "100%",
		  "background-position": endPosition
		$("#end-value").text( "100% {background-position: " + endPosition + "}")

		



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
	$("#mask-width-value").on "change", ->
		maskWidth = $(this).val()
		mask.css("width", maskWidth)
		# update the size of the container
		updateContainerWidth(maskWidth)
	$("#mask-height-value").on "change", ->
		maskHeight = $(this).val()
		mask.css("height", maskHeight)
		# update the size of the container
		updateContainerHeight(maskHeight)
		
	updateContainerWidth = (maskWidth) ->
		imageWidth = image.width()
		container.css("width", imageWidth + maskWidth)
		draggie.enable()
	updateContainerHeight = (maskHeight) ->
		imageHeight = image.height()
		container.css("height", imageHeight + maskHeight)





