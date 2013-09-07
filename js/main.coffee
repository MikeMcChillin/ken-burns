$ ->
	img = new Image
	image = $("#image")
	mask = $("#mask")
	maskClone = $("#mask-clone")
	container = $("#container")
	# img.src = image.css("background-image").replace(/url\(|\)$/g, "")
	# Make sure image is loaded before starting any width/height calculations.
	$(".container").imagesLoaded ->
		# imgWidth = img.width
		# imgHeight = img.height
		# imageWidth = (imgWidth / 2)
		# imageHeight = (imgHeight / 2)

		imageWidth = image.width()
		imageHeight = image.height()

		maskWidth = image.width() / 2
		console.log "maskWidth: " + maskWidth
		maskHeight = image.height() / 2
		console.log "maskHeight: " + maskHeight
		setMaskDimensions = ->
			mask.css
				"width": maskWidth
				"height": maskHeight
			maskClone.css
				"width": maskWidth
				"height": maskHeight

		setMaskDimensions()

		setContainerDimensions = ->
			container.css
				"width": imageWidth + (maskWidth*1)
				"height": imageHeight + (maskHeight*1)
		setContainerDimensions()

		positionMask = ->
			mask.css
				"left": "50%"
				"top": "50%"
				"margin-left": -0.5*maskWidth
				"margin-top": -0.5*maskHeight
			maskClone.css
				"left": "50%"
				"top": "50%"
				"margin-left": -0.5*maskWidth
				"margin-top": -0.5*maskHeight
		
		positionMask()
	



	# 	# Get the Image Width & Height
	# 	$("#imgWidth").text(imgWidth)
	# 	$("#imgHeight").text(imgHeight)

	# 	# Set the initial image Width & Height
	# 	image.css
	# 		width: imgWidth + "px"
	# 		height: imgHeight + "px"

	# 	# Set the data attributes of the image so I can grab the content via css
	# 	image.data("width", imgWidth)
	# 	image.data("height", imgHeight)


	
	# updateBG = ->
	# 	bgLeft = image.css('left')
	# 	bgTop = image.css('top')
	# 	console.log "bgLeft: " + bgLeft
	# 	console.log "bgTop: " + bgTop

	# 	image.css
	# 		"background-position": bgLeft + "px " + bgTop + "px"
 


	

	# Since we're moving an image, let's actually apply it to our mask's bg image
	updateBackgroundPosition = (dragEvent, draggieInstance, event, pointer) ->
		position = draggieInstance.position
		mask.css
			"background-position": position.x + "px " + position.y + "px"
		message = dragEvent + "\n" + event.type + " at " + pointer.pageX + ", " + pointer.pageY + "\n" + "draggie position at " + position.x + ", " + position.y
		# For testing purposes only
		$("#wef").text(message)
		
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




	###################################
	# Inputs
	###################################

	# Update the the image size
	$("input[type='range']").change ->
		val = $(this).val()
		val = parseInt(val)
		which = $(this).attr("data-property")
		unit = $(this).attr("data-unit")

		# Update the data-value so I can display it next to the inputs
		$(this).attr("data-value", val)

		# Display the value beside the slider
		#$("#{which}").val(val)

		switch which
			when "background-size"
				mask.css
					"background-size":  "#{val}#{unit}"
			when "animation-duration"
				mask.css
					"animation-duration": "#{val}#{unit}"
			when "animation-delay"
				mask.css
					"animation-delay": "#{val}#{unit}"
			when "animation-iteration-count"
				mask.css
					"animation-iteration-count": "#{val}"


	$("input[type='text']").change ->
		which = $(this).data("property")
		name = $(this).val()
		# Update the data-value so I can display it next to the inputs
		$(this).attr("data-value", val)
		switch which
			when "animation-name"
				mask.css
					"animation-name": "#{name}"

	$("select").change ->
		which = $(this).data("property")
		value = $(this).val()
		# Update the data-value so I can display it next to the inputs
		$(this).attr("data-value", val)
		switch which
			when "animation-timing-function"
				mask.css
					"animation-timing-function": "#{value}"

	$("a[data-property='animation-iteration-count']").click (e) ->
		e.preventDefault()
		# Update the data-value so I can display it next to the inputs
		$(this).attr("data-value", val)
		mask.css 
			"animation-iteration-count": "infinite"





