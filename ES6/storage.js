//ekledğimiz filmleri local storage a ekleeyelim.
class Storage{
    //----------------------------------------------------------------------------------------
    //bu constructor umuzun bir özelliği olmayacak saedece prototype larına  fonksiyonlarımızı yazıcaz.
    //----------------------------------------------------------------------------------------
    //--- localstorage dan birçok defa films lerı çekmemiz gerektiği için genel bir fonksiyon yazarak bunnu heryerde kullanalmak için bir fonksiyon yazalım-------
    //NOT:BU getTodosFromStorage() FONKSİYONU BÜTÜN TODOLARI ALMAMIZI SAĞLAR.



    static addFilmToStorage(newFilm){
        //bu fonksiyon aldığı film e göre local storage e ekleme yapacak.
        //bu filmimizi bir tane array e yazıcaz. ve bu arrayimizi local storage e eklicez.
        //ancak öncesinde local storage da bir array imiz olabilir.bu yüzden ilk olarak bunları almamız gerekiyor.bunu da getFilmsFromStorage() fonksiyonundan alıcaz.

        let films = this.getFilmsFromStorage(); //şu anki objemizin üzerinde yapacagımızı belirtiyoruz this ile.

        films.push(newFilm);

        localStorage.setItem("films",JSON.stringify(films)); //ilk yazdığımız key değeri ,ikinci films değeri ise bize eklenmesi için gelen films.
    
    }
    //----------------------------------------------------------------------------------------


    //----------------------------------------------------------------------------------------
    static getFilmsFromStorage(){

        //ilk olarak "films" isimli bir key imiz varsa o key imizi alıcaz.ve "newFilm" ile gönderilen değeri "films" e ekleyip tekrardan yazıcaz.eğer "films" key imiz yoksa oluşturcaz.
        let films;

        if(localStorage.getItem("films") === null){  //films key i yoksa yani null ise films arrayi oluştursun.
            films = [];
        }
        else {
            films = JSON.parse(localStorage.getItem("films")); //eğer varsa films key ini alalım.local storage değerleri string değer olarak tutuyor. bu yüzden parse edip array e çevirmemiz gereliyor.
        }
        return films; //bu fonksiyon bize bir array dönecek.
    }

    //----------------------------------------------------------------------------------------
    //filmleri storagedan silme:

    //filmi localden kaldırmak için >> filmi ismine göre kaldırmaya çalışıcaz.ilk olarak filmin ismini almamız gerekiyor.sonrasında local storage dan sorgulayacagız. ve herhangi bir objemin title ı , o filmin ismi ise objemi array den kaldırıcam.


    static deleteFilmFromStorage(filmTitle){
        
        //localden array imizi alalım.
        let films = this.getFilmsFromStorage();
        //splice metodu ile arrayden silme yapıyoruz
        films.forEach(function(film,index){
            if(film.title === filmTitle){
                films.splice(index,1);
            }
        });
        localStorage.setItem("films",JSON.stringify(films));
    }

    //----------------------------------------------------------------------------------------
    //tüm filmleri storagedan silme:

    static clearAllfilmsFromStorage(){
        localStorage.removeItem("films");
    }
}