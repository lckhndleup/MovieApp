const form = document.querySelector("#film-form");

//3 tane input alanını seçme(film ismi , yönetmen, film afiş linki)

const titleElement = document.querySelectorAll(".form-control")[0]; //film ismi inputu

const directorElement = document.querySelectorAll(".form-control")[1]; //yönetmen inputu 

const urlElement = document.querySelectorAll(".form-control")[2]; //film afiş linki inputu

const secondCardBody = document.querySelectorAll(".card-body")[1]; 

const clearButton = document.querySelector("#clear-films");

//------------------------------------------------------------------------------------------




eventListeners();
function eventListeners (){
    form.addEventListener("submit",addFilm); //form submit oldugunda addFilm fonksiyonu çalışsın.
    document.addEventListener("DOMContentLoaded",function(){ 
        
        let films = Storage.getFilmsFromStorage();//array i dönecek.
        
        UI.loadAllFilms(films);

    }); 
    
    

    secondCardBody.addEventListener("click",deleteFilm);
    //-------------------------------------------
    //tüm filmleri silme:

    clearButton.addEventListener("click",clearAllFilms);


}

//------------------------------------------------------------------------------------------

//film ekleme fonksiyonu:

function addFilm (event){
    

    //input değerlerini alma (value ile alıyoruz):
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    

    if(title === "" || director === "" || url === ""){  // ("||" >>> veya()  
        //hata mesajı:
        UI.displayMessages("Tüm Alanları Doldurun!!!","danger");
    }
    else{
        
        //Yeni Film:
        const newFilm = new Film(title,director,url); //Film const. ı 3 tane arguman alıyordu.bu değerleri title, director  ve url olacak.

        //bu obje oluştuktan sonra , oluşturmuş oldugumuz ui objesi üzerinde bir tane fonksiyon yazıcaz.

        UI.addFilmToUI(newFilm); // newFilm objesini oluşturduktan sonra ,arayüz objemiz , newFilm objesini arguman olarak alıp bir fonksiyon çalıştırcak . BU FONKSİYON GİRİLEN DEĞERLERE GÖRE ARAYÜZE FİLM EKLEYECEK.
        //addFilmToUI() fonksiyonunu ui.js de yazıcaz.

        //-------------------------------
        //local storage a ekleme fonksiyonu:
        Storage.addFilmToStorage(newFilm);
        //-------------------------------
        //-------------------------------
        //bilgilendirme mesajı:

        UI.displayMessages("Film Başarıyla Eklendi...","success"); 

        //-------------------------------
    }
    
    UI.clearInputs(titleElement,directorElement,urlElement); 





    event.preventDefault();
}

//------------------------------------------------------------------------------------------

function deleteFilm(event){
    if(event.target.id === "delete-film"){
        UI.deleteFilmFromUI(event.target);
        Storage.deleteFilmFromStorage(event.target.parentElement.previousElementSibling.previousElementSibling.textContent); // filmi sil e bastıgımızda bize event.target >> a etiketini veriyor. a elementinin parent elementi a etiketinin parenti olan td yi verir. td nin bir önceki kardeşi olan td ye gidip , o td den de önceki kardeşine gidersek ilk baştaki td ye varmış oluruz. ilk td nin text content i de bize filmin ismini verir. eğer biz bu ismi arguman olarak gönderip local storageda array in içerisinde gezip bu title a eşit bir element bulursak bunu sildirebiliriz.
    }
}

//------------------------------------------------------------------------------------------
//tüm filmleri hem storage dan hemde arayüzden silme: 

function clearAllFilms(event){
    if(confirm("Tüm Filmler Silinecek devam etmek ister misiniz?")){
        UI.clearAllFilmsFromUI();//arayüzden kaldırma
        Storage.clearAllfilmsFromStorage();//storage dan kaldırma
    }
}
