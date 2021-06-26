var imageFile;

window.addEventListener('load', function() {
    $('#imgInpDesign').on('click', function () { 
        $('#imgInp').click();
        document.querySelector('#imgInp').addEventListener('change', function() {
	      if (this.files && this.files[0]) {
	          var img = document.querySelector('#imageFile');
	          img.onload = () => {
	              URL.revokeObjectURL(img.src);  
	          }

	          imageFile = this.files[0];
	          img.src = URL.createObjectURL(this.files[0]); // set src to blob url
	      }
	  	});
    });
});