class Usuario{
    nombre;
    apellido;
    libros;
    mascotas;

    constructor(nombre, apellido, libros=[], mascotas=[]){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName(){
        return console.log(`Nombre de usuario: ${this.nombre} ${this.apellido}`)
    }
    addMascotas(petName){
        this.mascotas.push(petName)
    }
    countMascotas(){
        return console.log(`Cantidad de mascotas agregadas: ${this.mascotas.length}`)
    }
    addbook(nameBook,authorBook){
        let obj = {
            nombre: nameBook,
            autor: authorBook
        }
        this.libros.push(obj)
    }
    getBookName(){
        let arr = []
        this.libros.forEach(element => {
            arr.push(element.nombre)
        });
        return console.log(arr)
    }
    

}

const p1 = new Usuario('Augusto','Marengo')

p1.getFullName()
p1.addMascotas('Hera')
p1.countMascotas()
p1.addbook('Cronicas Marcianas','Ray Bradbury')
p1.getBookName()

const p2 = new Usuario('Augusto2', 'Marengo2',[{nombre:'El principito',autor:' Antoine de Saint-Exupéry'}],['Omi'] )

p2.getFullName()
p2.addMascotas('Hera')
p2.countMascotas()
p2.addbook('Cronicas Marcianas','Ray Bradbury')
p2.getBookName()