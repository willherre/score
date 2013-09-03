exports.createSchema = function(mongoose){
mongoose.connect("mongodb://localhost/app");
	
var QuestionSchema = new mongoose.Schema({
	question: String,
	response: String,
	user_id: String,
	done: { type: Number, default: 0},
	date: { type: Date, default: Date.now}, 
});



Question = mongoose.model("questions", QuestionSchema);

var UsuarioSchema = new mongoose.Schema({
	nombre: String,
	apellido: String,
	user_id: String,

});

Usuario = mongoose.model("usuario", UsuarioSchema);

}
