//ilk olarak formumuzu seçmemiz gerekiyor."film ekleyin" butonuna bastıgımız zaman film eklemeye çalışıcaz.bunu ana js dosyamız olan project.js de yapıcaz.

//formu seçme (film ekleyin butonuna basıdıgında film eklemek için form seçiyoruz.)

const form = document.querySelector("#film-form");

//3 tane input alanını seçme(film ismi , yönetmen, film afiş linki)

const titleElement = document.querySelectorAll(".form-control")[0]; //film ismi inputu

const directorElement = document.querySelectorAll(".form-control")[1]; //yönetmen inputu 

const urlElement = document.querySelectorAll(".form-control")[2]; //film afiş linki inputu

const secondCardBody = document.querySelectorAll(".card-body")[1]; 

const clearButton = document.querySelector("#clear-films");
//arayüze film ekleme yapmak istediğimiz için bir tane UI Constructor a ihtiyacımız var.arayüz işlemlerimizi bu consturctor da yapıcaz.(ui.js de yapıcaz.)
//------------------------------------------------------------------------------------------
//arayüz işlemlerini başlatma:(ui constructorundan obje oluşturalım.)
const ui = new UI();
//------------------------------------------------------------------------------------------
//local storage işlemleri için storage.js de oluşturduğumuz Storage constructor dan obje üretelim.

const storage = new Storage();

//------------------------------------------------------------------------------------------
//tüm eventleri yüklemek için bir fonksiyon yazıcaz.(aynı önceki projede yaptıgımız gibi eventListenersları bir fonksiyon altında toplucaz.)

eventListeners();
function eventListeners (){
    //ilk olarak formumuza submit event i katmamız gerekiyor.form submit oldugunda bu event oluşsun.
    form.addEventListener("submit",addFilm); //form submit oldugunda addFilm fonksiyonu çalışsın.
    //-------------------------------------------
    //sayfa  yüklendiğinde filmlerin arayüzde kalması için DOMContentLoaded() eventini eklememiz gerekiyor.
    document.addEventListener("DOMContentLoaded",function(){ 
        //fonksiyonu ekstra olarak yazmadık, direk burda yazıcaz.
        //yapmamız gerekn şey:local storageden arrayimizi almamız gerekiyor.
        //getFilmsFromStorage() dan arrayimizi alıcaz.
        let films = storage.getFilmsFromStorage();//array i dönecek.
        //bu array i ui ın içindeki loadAllFilms() fonksiyonuna göndericez.
        ui.loadAllFilms(films);

    }); 
    //-------------------------------------------
    //filmleri arayüzden silme için event delegation yada event capturing özelliğini kullanıcaz.cardbody e click event i atıcaz. event target ile alıcaz.(2 tane card body var 2ncisini alıcaz.)
    //card-body i seçelim:
    

    secondCardBody.addEventListener("click",deleteFilm);
    //-------------------------------------------
    //tüm filmleri silme:

    clearButton.addEventListener("click",clearAllFilms);


}

//------------------------------------------------------------------------------------------

//film ekleme fonksiyonu:

function addFilm (event){
    //bu fonksiyonda ilk olarak yapmamız gereken şey şu : 3 adet inputumuz vardı bunları yukarda seçtik.(film ismi=titleElement,yönetmen=directorElement,film afiş=urlElement) bu inputların değerlerini alalım.

    //input değerlerini alma (value ile alıyoruz):
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    //sıradaki işlen şu olmalı >>> eğer bu inputlardan bir tanesi bile eksik ise hata mesajı gelsin istiyoruz.

    if(title === "" || director === "" || url === ""){  // ("||" >>> veya()  
        //hata mesajı:
        ui.displayMessages("Tüm Alanları Doldurun!!!","danger");
    }
    else{
        //eğer 3 tane inputta dolu ise film oluşturmaya çalısıcaz.ve filmimizi "Film" Constructordan oluşturcaz.

        //Film const. dan obje oluşturalım.
        //Yeni Film:
        const newFilm = new Film(title,director,url); //Film const. ı 3 tane arguman alıyordu.bu değerleri title, director  ve url olacak.

        //bu obje oluştuktan sonra , oluşturmuş oldugumuz ui objesi üzerinde bir tane fonksiyon yazıcaz.

        ui.addFilmToUI(newFilm); // newFilm objesini oluşturduktan sonra ,arayüz objemiz , newFilm objesini arguman olarak alıp bir fonksiyon çalıştırcak . BU FONKSİYON GİRİLEN DEĞERLERE GÖRE ARAYÜZE FİLM EKLEYECEK.
        //addFilmToUI() fonksiyonunu ui.js de yazıcaz.

        //-------------------------------
        //local storage a ekleme fonksiyonu:
        storage.addFilmToStorage(newFilm);
        //-------------------------------
        //-------------------------------
        //bilgilendirme mesajı:

        ui.displayMessages("Film Başarıyla Eklendi...","success"); 

        //-------------------------------
    }
    //film eklendikten hemen sonra bu fonksiyonu çağırıyoruz ki input alanları boşalsın . 
    ui.clearInputs(titleElement,directorElement,urlElement); //argümanlar input alanlarımız olacak. dikkat!!! title, director ve url değil. onlar value değerleri bizim istediğimiz input alanlarıdır.





    event.preventDefault();//formun submit edilmesini önlemek için yazdıgımız fonksiyon.(sayfayı tekrardan yüklüyordu.bunu engelliyoruz.yani default olan değerini engelliyoruz.)
}

//------------------------------------------------------------------------------------------

function deleteFilm(event){
    if(event.target.id === "delete-film"){
        ui.deleteFilmFromUI(event.target);
        storage.deleteFilmFromStorage(event.target.parentElement.previousElementSibling.previousElementSibling.textContent); // filmi sil e bastıgımızda bize event.target >> a etiketini veriyor. a elementinin parent elementi a etiketinin parenti olan td yi verir. td nin bir önceki kardeşi olan td ye gidip , o td den de önceki kardeşine gidersek ilk baştaki td ye varmış oluruz. ilk td nin text content i de bize filmin ismini verir. eğer biz bu ismi arguman olarak gönderip local storageda array in içerisinde gezip bu title a eşit bir element bulursak bunu sildirebiliriz.
    }
}

//------------------------------------------------------------------------------------------
//tüm filmleri hem storage dan hemde arayüzden silme: 

function clearAllFilms(event){
    if(confirm("Tüm Filmler Silinecek devam etmek ister misiniz?")){
        ui.clearAllFilmsFromUI();//arayüzden kaldırma
        storage.clearAllfilmsFromStorage();//storage dan kaldırma
    }
}