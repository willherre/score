var app = {};
app.questions = {
    init: function(){
	this.addQuestion();
    },
 	
    addQuestion: function(){
	var wrapAdd = $("#wraptextarea"),
	addButton = wrapAdd.find("button"),
            content = wrapAdd.find("textarea")
        ;
    
  
    addButton.on("click", function(e){
        e.preventDefault();
  
	$.ajax({
	    url: "/question/add",
	    method:'POST',
		data: {content: content.val()},
		success: function (response) {
        $("#wrapquestions").html(response);
		}
	    });
	});
    }
}
app.questions.init();
	
