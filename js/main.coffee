$ ->
	# img = new Image
	# image = $("#image")
	# img.src = image.css("background-image").replace(/url\(|\)$/g, "")
	# # Make sure image is loaded before starting any width/height calculations.
	# $(".container").imagesLoaded ->
	# 	imgWidth = img.width
	# 	imgHeight = img.height
	# 	imageWidth = (imgWidth / 2)
	# 	imageHeight = (imgHeight / 2)

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
 




	###################################
	# Initiate Dragabilly
	###################################

	# elem = document.querySelector("#image")
	# draggie = new Draggabilly(elem,
	# 	containment: true
	# )

	# onDragMove = (instance, event, pointer) ->
	# 	console.log "dragMove on " + event.type + pointer.pageX + ", " + pointer.pageY + " position at " + instance.position.x + ", " + instance.position.y
	# draggie = new Draggabilly(image)

	# # bind event listener
	# draggie.on "dragMove", onDragMove

	# # un-bind event listener
	# draggie.off "dragMove", onDragMove

	# # return true to trigger an event listener just once
	# draggie.on "dragMove", ->
	# 	console.log "Draggabilly did move, just once"
	# 	true
	


	
	notify = (dragEvent, draggieInstance, event, pointer) ->
		position = draggieInstance.position
		message = dragEvent + "\n" + event.type + " at " + pointer.pageX + ", " + pointer.pageY + "\n" + "draggie position at " + position.x + ", " + position.y
		console.log message
	demo = document.querySelector("#mask")
	elem = demo.querySelector("#image")
	draggie = new Draggabilly(elem)
	output = demo.querySelector("code")
	draggie.on "dragStart", (draggieInstance, event, pointer) ->
		notify "DRAG START", draggieInstance, event, pointer

	draggie.on "dragMove", (draggieInstance, event, pointer) ->
		notify "DRAG MOVE", draggieInstance, event, pointer

	draggie.on "dragEnd", (draggieInstance, event, pointer) ->
		notify "DRAG END", draggieInstance, event, pointer




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
				image.css
					"background-size":  "#{val}#{unit}"
			when "animation-duration"
				image.css
					"animation-duration": "#{val}#{unit}"
			when "animation-delay"
				image.css
					"animation-delay": "#{val}#{unit}"
			when "animation-iteration-count"
				image.css
					"animation-iteration-count": "#{val}"


	$("input[type='text']").change ->
		which = $(this).data("property")
		name = $(this).val()
		# Update the data-value so I can display it next to the inputs
		$(this).attr("data-value", val)
		switch which
			when "animation-name"
				image.css
					"animation-name": "#{name}"

	$("select").change ->
		which = $(this).data("property")
		value = $(this).val()
		# Update the data-value so I can display it next to the inputs
		$(this).attr("data-value", val)
		switch which
			when "animation-timing-function"
				image.css
					"animation-timing-function": "#{value}"

	$("a[data-property='animation-iteration-count']").click (e) ->
		e.preventDefault()
		# Update the data-value so I can display it next to the inputs
		$(this).attr("data-value", val)
		image.css 
			"animation-iteration-count": "infinite"





