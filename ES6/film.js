
//------------------------------------------------------------------------------------------
//Film Constructor:
// function Film (title,director,url){
//     this.title = title;
//     this.director = director ;
//     this.url = url ;
// }


//------------------------------------------------------------------------------------------

//ilk olarak formumuzu seçmemiz gerekiyor."film ekleyin" butonuna bastıgımız zaman film eklemeye çalışıcaz.bunu ana js dosyamız olan project.js de yapıcaz.

//formu seçme (film ekleyin butonuna basıdıgında film eklemek için form seçiyoruz.)

//project.js ye gidip inputları seçtirelim.
//------------------------------------------------------------------------------------------

//arayüze film ekleme yapmak istediğimiz için bir tane UI Constructor a ihtiyacımız var.arayüz işlemlerimizi bu consturctor da yapıcaz.(ui.js de yapıcaz.)

//------------------------------------------------------------------------------------------

//burdan sonra ES6 ile yazıcaz.

class Film {
    constructor(title,director,url){
        this.title=title;
        this.director = director;
        this.url =url;
    }
}




