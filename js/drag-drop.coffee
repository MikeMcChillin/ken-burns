# Required for drag and drop file access
jQuery.event.props.push "dataTransfer"

# IIFE to prevent globals
(->
  s = undefined
  Avatar =
    settings:
      bod: $("body")
      img: $("#image")
      fileInput: $("#uploader")

    init: ->
      s = Avatar.settings
      Avatar.bindUIActions()

    bindUIActions: ->
      timer = undefined
      s.bod.on "dragover", (event) ->
        clearTimeout timer
        Avatar.showDroppableArea()  if event.currentTarget is s.bod[0]
        
        # Required for drop to work
        false

      s.bod.on "dragleave", (event) ->
        if event.currentTarget is s.bod[0]
          
          # Flicker protection
          timer = setTimeout(->
            Avatar.hideDroppableArea()
          , 200)

      s.bod.on "drop", (event) ->
        
        # Or else the browser will open the file
        event.preventDefault()
        Avatar.handleDrop event.dataTransfer.files

      s.fileInput.on "change", (event) ->
        Avatar.handleDrop event.target.files


    showDroppableArea: ->
      s.bod.addClass "droppable"

    hideDroppableArea: ->
      s.bod.removeClass "droppable"

    handleDrop: (files) ->
      Avatar.hideDroppableArea()
      
      # Multiple files can be dropped. Lets only deal with the "first" one.
      file = files[0]
      if file.type.match("image.*")
        Avatar.resizeImage file, 256, (data) ->
          Avatar.placeImage data

      else
        alert "That file wasn't an image."

    resizeImage: (file, size, callback) ->
      fileTracker = new FileReader
      fileTracker.onload = ->
        Resample @result, size, size, callback

      fileTracker.readAsDataURL file
      fileTracker.onabort = ->
        alert "The upload was aborted."

      fileTracker.onerror = ->
        alert "An error occured while reading the file."

    placeImage: (data) ->
      s.img.attr "src", data

  Avatar.init()
)()