window.onload = () => {
	$('#sendbutton').click(() => {
		imagebox = $('#imagebox')
    imagebox_style = $('#imagebox_style')
    imagebox_output = $('#imagebox_output')
		input = $('#input_file')[0]
    input0 = $('#style_file')[0]
		if(input.files && input.files[0] && input0.files && input0.files[0])
		{
			let formData = new FormData();
			formData.append('input_filename' , input.files[0]);
      formData.append('style_filename' , input0.files[0]);
			$.ajax({
				url: "https://styletransfer-webapp.uk.r.appspot.com/styleImage", // fix this to your liking
				type:"POST",
				data: formData,
				cache: false,
				processData:false,
				contentType:false,
				error: function(data){
					console.log("upload error" , data);
					console.log(data.getAllResponseHeaders());
				},
				success: function(data){
					// alert("hello"); // if it's failing on actual server check your server FIREWALL + SET UP CORS
          console.log("Success");
					bytestring = data['content']
					image = bytestring.split('\'')[1]
					imagebox.attr('src' , 'data:image/jpeg;base64,'+image)
          bytestring = data['style']
          image = bytestring.split('\'')[1]
          imagebox_style.attr('src' , 'data:image/jpeg;base64,'+image)
          bytestring = data['stylized']
          image = bytestring.split('\'')[1]
          imagebox_output.attr('src' , 'data:image/jpeg;base64,'+image)
				}
			});
		}
	});
};



function readUrl(input){
	imagebox = $('#imagebox')
	console.log("evoked readUrl")
	if(input.files && input.files[0]){
		let reader = new FileReader();
		reader.onload = function(e){
			// console.log(e)
			
			imagebox.attr('src',e.target.result); 
			// imagebox.height(300);
			// imagebox.width(300);
		}
		reader.readAsDataURL(input.files[0]);
	}

	
}