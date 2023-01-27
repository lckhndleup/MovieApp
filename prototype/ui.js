//arayüz işlemlerimizin hepsini burada yapıcaz.
//UI constructor :

//bu UI ın herhangi bir özelliği olmayacak.sadece prototype larına fonksiyonlarımızı yazmaya çalıçaz.

function UI(){

}




//--------------------------------------------------------------------------------------
//ilk başta prototypeları kullanalım.(sonrasında es6 class ı kullanalım.ikiside aynı işlemi yapıyor)

//UI constructor un prototype ına metod eklicez.
UI.prototype.addFilmToUI = function(newFilm){ 
    //bu fonksiyonumuz newFilm alacak bize bir obje gönderecek.
    //arayüzüze yazdıralım.bunun için table ın tbody sini seçmemiz gerekiyor.
    //--------------------------------------------------------------------------------
    //yapımız şöyle olacak//
    /*<!-- <tr>
        <td><img src="" class="img-fluid img-thumbnail"></td>
        <td></td>
        <td></td>
        <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
    </tr> --> */
    //--------------------------------------------------------------------------------
    // bu yapıyı tbody e eklememiz gerkeiyor.
    //--------------------------------------------------------------------------------
    //tbody i seçelim.

    const filmList = document.querySelector("#films"); //tbody i seçtik.

    //tbody nin innerhtml ine tr ler ekleyecegız.ancak += yapmazsak eski filmin üzerine yazar.

    //template literal kullanıcaz.(daha güzel bir yazım için)
    //bize gönderilen newFilm in url sini >>> img nin src sine vericez.
    //bize gönderilen newFilm in title ini >>> td ye eklicez.
    //bize gönderilen newFilm in director unu >>> td ye eklicez.
    filmList.innerHTML += ` 
        <tr>
            <td><img src="${newFilm.url}" class="img-fluid img-thumbnail"></td>
            <td>${newFilm.title}</td> 
            <td>${newFilm.director}</td>
            <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
        </tr>
    
    
    `;
}

//------------------------------------------------------------------------------------------
//filmi ekledikten sonra input alanının boşaltmak istiyoruz.(orda yazılı kalıyor):

UI.prototype.clearInputs = function(element1,element2,element3){
    element1.value = "";
    element2.value = "";
    element3.value = "";
}

//------------------------------------------------------------------------------------------

//bilgilendirme mesajları :

UI.prototype.displayMessages = function(message,type){  //2 değer alacak.
    /* 
    <div class="alert alert-primary" role="alert">
         This is a primary alert—check it out!
    </div>
    */
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    //eklemek istediğimiz yer card-body nin sonuna eklemesi. bu yüzden card-body i seçelim ilk olarak.

    const cardBody = document.querySelectorAll(".card-body")[0];

    cardBody.appendChild(alert);

    setTimeout(function(){
        alert.remove();
    },1000);
   



}

//------------------------------------------------------------------------------------------

//filmleri sayfa yenilendiğinde localden arayüze yükleme:

UI.prototype.loadAllFilms = function(films){ //bu fonksiyonumuz içine films arrayi alacak ve bunu arayüze eklemeye çalışıcaz.
    //biz filmleri tbody e ekliyorduk.tbody i seçmemiz gerekiyor.

    const filmList = document.querySelector("#films");
    //şimdi films array i üzerinde gezinmemiz gerekiyor ve her filmi almamız gerekiyor.

    films.forEach(function(film){
        ui.addFilmToUI(film);
        //const filmList = document.querySelector("#films");
        //her bir filmimiziz title , director ve url adresi var.bunları filmList in innerHtml ine bunları eklemeye çalışıcaz.
        // filmList.innerHTML +=
        // `<tr>
        //     <td><img src="${film.url}" class="img-fluid img-thumbnail"></td>
        //     <td>${film.title}</td> 
        //     <td>${film.director}</td>
        //     <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
        // </tr>`;

    });
    
    //innerhtml ile içeriğini değiştiriyoruz.her sefer üzerine ekleme yapması için += koyucaaz.

}




//------------------------------------------------------------------------------------------

//filmi arayüzden silme:

UI.prototype.deleteFilmFromUI = function(element){
    element.parentElement.parentElement.remove();
    ui.displayMessages("Film Başarıyla Silindi...","primary");
}


//------------------------------------------------------------------------------------------
//tüm filmleri arayüzden kaldırma:

UI.prototype.clearAllFilmsFromUI = function(){
    //tüm filmleri seçelim
    const filmList = document.getElementById("films");//tbody izin altında tüm filmler mevcut
    //şu yöntemi kullanarak hepsini arayüzden silebiliriz.
    //filmList.innerHTML ="";  >> tüm filmleri arayüzden siler.ama bu yöntem yavaştır.

    while(filmList.firstElementChild != null){ //yani çocugumuz oldugu sürece devam eder.
        filmList.firstElementChild.remove();
    }

    if(filmList.firstElementChild === null){
        this.displayMessages("Tüm Filmler Silindi...","warning");
    }



}



