window.onload=gal = JSON.parse(sessionStorage.getItem("logdin"));//logdin-ברגע שהדף נטען במלואו המישתנה מכבל ארך שמור מ
window.onload=checkstat();//checkstart ברגע שהדף נטען במלואו קוראים לפונקציה  
window.onload=sessionStorage.setItem("st", JSON.stringify(0));
window.onload=sessionStorage.setItem("ride", JSON.stringify(0));



function checkstat(){ //התחלת פונקציה 
    c4=JSON.parse(sessionStorage.getItem("c4"))
    sessionStorage.setItem("logdin", JSON.stringify(gal));//logdin מכניס לתוך ערך שמור את המשתנה הממורמר לתוך 
    gal = JSON.parse(sessionStorage.getItem("logdin"));//logdin-מישתנה מכבל ארך שמור מ
    change = document.getElementById("disappear");//מקשר אלמנת יחודי למישתנה
    change1 = document.getElementById("disappear1");//מקשר אלמנת יחודי למישתנה
    change2 = document.getElementById("disappear2");//מקשר אלמנת יחודי למישתנה
    change3 = document.getElementById("disappear3");//מקשר אלמנת יחודי למישתנה

    if(gal==1){//trueהקוד בתוך הצהרה איתקים עם המישתנה היה שווה ל1 או
        change.style.display = "block";//מגדיר את מאפיין התצוגה שהופך את האלמנט לגלוי
        change1.style.display = "none";//מגדיר את מאפיין התצוגה שהופך את האלמנט למוסתר
        change2.style.display = "block";//מגדיר את מאפיין התצוגה שהופך את האלמנט לגלוי
        change3.style.display = "block";//מגדיר את מאפיין התצוגה שהופך את האלמנט לגלוי
    }
    else{//הקוד איתקים עם הצהרה לא תהיה נכונה
        change.style.display = "none";//מגדיר את מאפיין התצוגה שהופך את האלמנט לגלוי
        change1.style.display = "block";//מגדיר את מאפיין התצוגה שהופך את האלמנט לגלוי
        change2.style.display = "none";//מגדיר את מאפיין התצוגה שהופך את האלמנט לגלוי
        change3.style.display = "none";//מגדיר את מאפיין התצוגה שהופך את האלמנט לגלוי
        if(c4==1){
        sessionStorage.setItem("c4", 0)
        window.location.href="index.html";}
    }
}
       
firebaseConfig = {//firebase מכיל מידע הנדרש לאתחול
    apiKey: "AIzaSyA0wvnQ1G2rgaG2YD0QlTc2IVwv9aTXM2w",//זה משמש לאימות בקשות
    authDomain: "testdis-564ca.firebaseapp.com",//מציין את תחום האימות 
    databaseURL: "https://testdis-564ca-default-rtdb.europe-west1.firebasedatabase.app",//מייצג את כתובת האתר 
    projectId: "testdis-564ca",//firebase-מתייחס למזהה הייחודי של הפרויקט
    storageBucket: "testdis-564ca.appspot.com",//CloudStorage-מציין את דלי ה
    messagingSenderId: "333900552007",//FirebaseCloudMessaging-מייצג את מזהה השולח עבור 
    appId: "1:333900552007:web:60e2e9b33af75a03fb1e62"//מציין את המזהה הייחודי
  };

const app = firebase.initializeApp(firebaseConfig);//Firebase אתחול 
       
function signup(){//התחלת פונקציה 
    UserName = document.getElementById("UserName");//מקשר אלמנת יחודי למישתנה
    Age = document.getElementById("Age");//מקשר אלמנת יחודי למישתנה
    Tire = document.getElementById("Tire");//מקשר אלמנת יחודי למישתנה
    email = document.getElementById("UserMail");//מקשר אלמנת יחודי למישתנה
    password = document.getElementById("UserPass");//מקשר אלמנת יחודי למישתנה
    
    function User(UserName,email,uid,Age,Tire){//פונקציית בנאי עבור אובייקט משתמש
        this.name = UserName//הצהרת הקצאה בתוך פונקציית בונה אובייקטים
        this.uid = uid//הצהרת הקצאה בתוך פונקציית בונה אובייקטים
        this.email = email//הצהרת הקצאה בתוך פונקציית בונה אובייקטים
        this.Age = Age//הצהרת הקצאה בתוך פונקציית בונה אובייקטים
        this.Tire = Tire//הצהרת הקצאה בתוך פונקציית בונה אובייקטים
    } 

    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)//מיצר משתנה עם אימייל וסיסמא
    .then((userCredential) => {//הקוד יתקיים עם משתנה יוצר בהצלחה
        user = userCredential.user;//מכניס למשתנה מידע שהושג לאחר יצירת משתמש
        tempUser = new User( UserName.value,user.email,user.uid,Age.value,Tire.value);//פונקציית בנאי הבונה אובייקט משתמש עם מאפיינים ספציפיים
        firebase.database().ref('users/' + UserName.value).set(tempUser);//FireBase-יצירת מערך עם תת כותרת ב
        console.log(user.uid)//מדפיס את המזהה הייחודי של המשתמש
        localStorage.setItem("currentUser",user.uid)//מאחסן את פרטי המשתמש בדפדפן
        uid=user.uid
        firebase.database().ref(`id:${uid}/cride`).set(0);
        document.getElementById("succes").innerHTML = 'succes';//succes-מכניס לתוך הקוד עם אלמנט ייחודי את הטקסט 
        sessionStorage.setItem("userc",1)//מאחסן את פרטי המשתמש בדפדפן
        window.location.href="rfid.html";//משנה את כתובת האתר הנוכחית של הדפדפן
    })
    .catch((error) => {//עם קורה שגיאה בהצהרה הקודמת זה תופס את הערך של השגיאה ומתחיל את הקוד שבתוכו
        errorCode = error.code;//מחלץ את קוד השגיאה המשויך לשגיאה שנתקלתה
        errorMessage = error.message;//מחלץ את הודעת השגיאה המתארת ​​את השגיאה ביתר פירוט
        console.log(errorCode)//רושם את קוד השגיאה למסוף הדפדפן
        console.log(errorMessage)//רושם את הודעת השגיאה למסוף הדפדפן
        document.getElementById("error").innerHTML =errorMessage;//errorMessage מכניס לתוך הקוד עם אלמנט ייחודי את הערך הנישמר ב
    });
}
        
        
function login(){//התחלת פונקציה 
    UserEmail = document.getElementById("LoginEmail");//מקשר אלמנת יחודי למישתנה
    UserPassword = document.getElementById("LoginPass");//מקשר אלמנת יחודי למישתנה       
    firebase.auth().signInWithEmailAndPassword(UserEmail.value, UserPassword.value)//מתחבר למשתנה עם אימייל וסיסמא
    .then((userCredential) => {//הקוד יתקיים עם משתנה התחבר בהצלחה
        user = userCredential.user;//מכניס למשתנה מידע שהושג לאחר התחברות למשתמש
        userString = JSON.stringify(user)//JSON-ממירה את אובייקט המשתמש למחרוזת 
        localStorage.setItem("currentUser",userString)//מאחסן את פרטי המשתמש בדפדפן
        console.log(user.uid)//מדפיס את המזהה הייחודי של המשתמש המאומת למסוף
        localStorage.setItem("uid", JSON.stringify(user.uid))
        sessionStorage.setItem("userc",1)//מאחסן את פרטי המשתמש בדפדפן
        window.location.href="rfid.html";//משנה את כתובת האתר הנוכחית של הדפדפן
    })

    .catch((error) => {//עם קורה שגיאה בהצהרה הקודמת זה תופס את הערך של השגיאה ומתחיל את הקוד שבתוכו
    errorCode = error.code;//מחלץ את קוד השגיאה המשויך לשגיאה שנתקלתה
    errorMessage = error.message;
    console.log(errorCode)//רושם את קוד השגיאה למסוף הדפדפן
    console.log(errorMessage)//מחלץ את הודעת השגיאה המתארת ​​את השגיאה ביתר פירוט
    document.getElementById("error").innerHTML = 'email dosent exsist';//email dosent exsist-מכניס לתוך הקוד עם אלמנט ייחודי את הטקסט   
    });    
}

function logout() {
    gal=0;
    sessionStorage.setItem("c4", JSON.stringify(1))
    checkstat();//checkstat-קוראים לפונקציה 
}


// function proximity(prox){
//     console.log(prox.val())
//     document.getElementById("prox").innerHTML = '<span class="proxD">'+prox.val()+'</span>'
// }

function kmh(kmh){//התחלת פונקציה עם ערך
    sessionStorage.setItem("kmh", JSON.stringify(kmh.val()));
    document.getElementById("kmh").innerHTML =kmh.val();//מכניס לתוך הקוד עם אלמנט ייחודי את הערך המתורגם שקיבלה הפונקציה
}

function data(dat){//התחלת פונקציה עם ערך
    dati=parseInt(dat.val())//מכניס לתוך הקוד עם אלמנט ייחודי את הערך המתורגם שהפך לסטרינג שקיבל מהפונקציה
    if(dat.val()>=11)//הקוד בתוך הצהרה יתקיים עם ההצהרה תהיה נכון 
        document.getElementById("prox").innerHTML ="very far"//very far-מכניס לתוך הקוד עם אלמנט ייחודי את הטקסט
    
    else if(dat.val()>=10)//הקוד בתוך הצהרה יתקיים עם ההצהרה היה נכון וההצהרה הקודמת לא תהיה הכון
        document.getElementById("prox").innerHTML ="far"//far-מכניס לתוך הקוד עם אלמנט ייחודי את הטקסט
    
    else if(dat.val()>= 1)//הקוד בתוך הצהרה יתקיים עם ההצהרה היה נכון וההצהרה הקודמת לא תהיה הכון
        document.getElementById("prox").innerHTML ="close"//close-מכניס לתוך הקוד עם אלמנט ייחודי את הטקסט
    
    else//הקוד בתוך ההצהרה יתקיים עם ההצהרה הקודמת לא תהיה הכון
        document.getElementById("prox").innerHTML = "very close"//very close-מכניס לתוך הקוד עם אלמנט ייחודי את הטקסט
    
}

function heartrate(bpm){//התחלת פונקציה עם ערך
    sessionStorage.setItem("bpm", JSON.stringify(bpm.val()));
    document.getElementById("bpm").innerHTML =bpm.val()//מכניס לתוך הקוד עם אלמנט ייחודי את הערך המתורגם שקיבלה הפונקציה
}

function distance(dis){//התחלת פונקציה עם ערך
    sessionStorage.setItem("distance", JSON.stringify(dis.val()));
    document.getElementById("dis").innerHTML =dis.val()//מכניס לתוך הקוד עם אלמנט ייחודי את הערך המתורגם שקיבלה הפונקציה
}

function min(min){//התחלת פונקציה עם ערך
    sessionStorage.setItem("minutes", JSON.stringify(min.val()));//מכניס לתוך המשתנה השמור את הערך המתורגם שהפך לסטרינג שקיבל מהפונקציה
}

function sec(sec){//התחלת פונקציה עם ערך
    sessionStorage.setItem("seconds", JSON.stringify(sec.val()));//מכניס לתוך המשתנה השמור את הערך המתורגם שהפך לסטרינג שקיבל מהפונקציה
}

function loca(loc){
    console.log(loc.val())
    loca=loc.val();
    coordinatesArray = loca.split(',');
    latitude = parseFloat(coordinatesArray[0]);
    longitude = parseFloat(coordinatesArray[1]);

    sessionStorage.setItem("latitude", JSON.stringify(latitude));
    sessionStorage.setItem("longitude", JSON.stringify(longitude));
    initMap();
}
function initMap() {
    latitude=JSON.parse(sessionStorage.getItem("latitude"));
    longitude=JSON.parse(sessionStorage.getItem("longitude"));
    const myLatLng = { lat: latitude, lng: longitude };
    console.log(myLatLng)
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: myLatLng,
    });
  
    new google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
    });
  }
  window.initMap = initMap;

function lock(lock){
    userc=JSON.parse(sessionStorage.getItem("userc"));
    if (lock.val()==1 && userc==1){
    sessionStorage.setItem("userc",0)//מאחסן את פרטי המשתמש בדפדפן
    gal=1;//משנה את הערך של המשתנה
    cride();
    checkstat();//checkstat-קוראים לפונקציה 
    }
    
}

function direc(dir){
    if(dir.val()==2)
        document.getElementById("direction").innerHTML = "Turning left"
    else if(dir.val()==1)
        document.getElementById("direction").innerHTML = "Turning right"
    else
        document.getElementById("direction").innerHTML = "Facing forward"
}

function cam(cam){
    if(cam.val()==1)
        takePicture()
}

function camip(cami){
    
    sessionStorage.setItem("camip", JSON.stringify(cami.val()));
    
}

document.addEventListener("DOMContentLoaded", function() {//מקשיב לשינוי פיירבייס בשביל התחלת פונקציה
    firebase.database().ref('timer/seconds').on('value', sec);//לוקח נתונים מהפיירבייס ושולח אותם לפוקציה
    firebase.database().ref('/prox').on('value', data);//לוקח נתונים מהפיירבייס ושולח אותם לפוקציה
    firebase.database().ref('/rps').on('value', kmh);//לוקח נתונים מהפיירבייס ושולח אותם לפוקציה
    firebase.database().ref('/bpm').on('value', heartrate);//לוקח נתונים מהפיירבייס ושולח אותם לפוקציה
    firebase.database().ref('/distance').on('value', distance);//לוקח נתונים מהפיירבייס ושולח אותם לפוקציה
    firebase.database().ref('timer/minutes').on('value', min);//לוקח נתונים מהפיירבייס ושולח אותם לפוקציה
    firebase.database().ref('location').on('value', loca);//לוקח נתונים מהפיירבייס ושולח אותם לפוקציה   
    firebase.database().ref('lock').on('value', lock);//לוקח נתונים מהפיירבייס ושולח אותם לפוקציה   
    firebase.database().ref('bike direction').on('value', direc);//לוקח נתונים מהפיירבייס ושולח אותם לפוקציה   
    firebase.database().ref('camera button').on('value', cam);//לוקח נתונים מהפיירבייס ושולח אותם לפוקציה   
    firebase.database().ref('ip').on('value', camip);//לוקח נתונים מהפיירבייס ושולח אותם לפוקציה   
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateride(){
    database = firebase.database(); // Firebase initialization
    uid = JSON.parse(localStorage.getItem("uid"));
    ride = JSON.parse(sessionStorage.getItem("ride"));

    cridePath = 'id:' +uid +'/cride';
    bpmpath = 'id:' +uid +'/ride:' +ride +'/avgbpm'
    bpmdis = 'id:' +uid +'/ride:' +ride +'/avgdis'
    bpmkmh = 'id:' +uid +'/ride:' +ride +'/avgkmh'
    sec = 'id:' +uid +'/ride:' +ride +'/seconds'
    min = 'id:' +uid +'/ride:' +ride +'/minutes'

    database.ref(cridePath).once('value', function(snapshot) {
        sessionStorage.setItem("cride", JSON.stringify(snapshot.val()));
    });
    database.ref(bpmpath).once('value', function(snapshot) {
        sessionStorage.setItem("cbpm", JSON.stringify(snapshot.val()));
    });
    database.ref(bpmdis).once('value', function(snapshot) {
        sessionStorage.setItem("cdis", JSON.stringify(snapshot.val()));
    });
    database.ref(bpmkmh).once('value', function(snapshot) {
        sessionStorage.setItem("ckmh", JSON.stringify(snapshot.val()));
    });
    database.ref(sec).once('value', function(snapshot) {
        sessionStorage.setItem("csec", JSON.stringify(snapshot.val()));
        console.log("12")
    });
    database.ref(min).once('value', function(snapshot) {
        sessionStorage.setItem("cmin", JSON.stringify(snapshot.val()));
        updateride()
    }); 
    sec = JSON.parse(sessionStorage.getItem("csec"));
    min = JSON.parse(sessionStorage.getItem("cmin"));
    time=sec+min*60

    ckmh=JSON.parse(sessionStorage.getItem("ckmh"));
    if(ckmh%1>0)
        ckmh=ckmh.toFixed(2);
    cdis=JSON.parse(sessionStorage.getItem("cdis"));
    if(cdis%1>0)
        cdis=cdis.toFixed(2);
    cbpm=JSON.parse(sessionStorage.getItem("cbpm"));
    if(cbpm%1>0)
        cbpm=cbpm.toFixed(2);
    document.getElementById("avgkmh").innerHTML =ckmh
    document.getElementById("avgbpm").innerHTML =cbpm
    document.getElementById("meter").innerHTML =cdis
    displaySeconds = sec < 10 ? '0' + sec : sec;
    document.getElementById('time').innerText = min + ':' + displaySeconds;
   
}

if(timer=null)//הקוד בתוך הצהרה יתקיים עם ההצהרה תהיה נכון 
timer=0;//משנה את הערך של המשתנה

function StartRide(){//התחלת פונקציה 
    st = JSON.parse(sessionStorage.getItem("st"));
    if(st!=1){
    sessionStorage.setItem("st", JSON.stringify(1));//מכניס לתוך המשתנה השמור ערך 
    seconds = JSON.parse(sessionStorage.getItem("seconds"));//מכניס לתוך המשתנה את הערך השמור המתורגם
    minutes = JSON.parse(sessionStorage.getItem("minutes"));//מכניס לתוך המשתנה את הערך השמור המתורגם
    if(minutes==null){//הקוד בתוך הצהרה יתקיים עם ההצהרה תהיה נכון 
        minutes=0;//משנה את הערך של המשתנה
        firebase.database().ref('timer/minutes' ).set(minutes);//firebase-שמירת ערך ב
    }
    timer = setInterval(updateTimer, 1000);//מגדיר טיימר חוזר שמפעיל פונקציה כל שנייה
    }
}

function updateTimer(){//התחלת פונקציה 
    seconds++;//מגדיל את הערך של המשתנה ב-1
    firebase.database().ref('timer/seconds').set(seconds);
    if (seconds >= 60){//הקוד בתוך הצהרה יתקיים עם ההצהרה תהיה נכון 
        seconds = 0;//משנה את הערך של המשתנה
        minutes++;//מגדיל את הערך של המשתנה ב-1
        firebase.database().ref('timer/seconds').set(seconds);//firebase-שמירת ערך ב
        firebase.database().ref('timer/minutes').set(minutes);//firebase-שמירת ערך ב
    }
    displaySeconds = seconds < 10 ? '0' + seconds : seconds;//בודק איזה ערך נכנס למשתנה לפי עם ההצהרה נכונה או לא
    document.getElementById('timer').innerText = minutes + ':' + displaySeconds;//מכניס לאלמנת ייחודי טקסט עם משתנים
    average();
}

function StopRide(){//התחלת פונקציה 
    sessionStorage.setItem("st", JSON.stringify(0));//מכניס לתוך המשתנה השמור ערך 
    clearInterval(timer);//מהפס את התיימר
    timer=0//משנה את הערך של המשתנה

}

function EndRide(){//התחלת פונקציה 
    history();
    sessionStorage.setItem("st", JSON.stringify(0));//מכניס לתוך המשתנה השמור ערך 
    clearInterval(timer);//מהפס את התיימר
    timer=0//משנה את הערך של המשתנה
    firebase.database().ref('timer/seconds').set(0);//firebase-שמירת ערך ב
    firebase.database().ref('timer/minutes').set(0);//firebase-שמירת ערך ב
    document.getElementById('timer').innerText = '0:00';//מכניס לאלמנת ייחודי טקסט
    reset();
}

function oneb() {
    ride = JSON.parse(sessionStorage.getItem("ride"));
    if (ride > 0) {
        ride = ride - 1;
        sessionStorage.setItem("ride", JSON.stringify(ride));
    }
    if (ride == 0) {
        change4 = document.getElementById("oneb");//מקשר אלמנת יחודי למישתנה
        change4.style.display = "none";//מגדיר את מאפיין התצוגה שהופך את האלמנט לגלוי
    }
    change4 = document.getElementById("onef");//מקשר אלמנת יחודי למישתנה
    change4.style.display = "block";//מגדיר את מאפיין התצוגה שהופך את האלמנט לגלוי
    avgdisplay();
}

function onef() {
    ride = JSON.parse(sessionStorage.getItem("ride"));
    cride = JSON.parse(sessionStorage.getItem("cride"));
    console.log(`ride: ${ride}, cride: ${cride}`)
    ride = ride + 1;
    console.log(`ride updated: ${ride}`)
    sessionStorage.setItem("ride", JSON.stringify(ride));
    if(ride==cride-1){
        change4 = document.getElementById("onef");//מקשר אלמנת יחודי למישתנה
        change4.style.display = "none";//מגדיר את מאפיין התצוגה שהופך את האלמנט לגלוי
    }
    change4 = document.getElementById("oneb");//מקשר אלמנת יחודי למישתנה
    change4.style.display = "block";//מגדיר את מאפיין התצוגה שהופך את האלמנט לגלוי
    avgdisplay();

}
function saveCrideToSessionStorage(cride) {
    sessionStorage.setItem("cride", JSON.stringify(cride)); // Assuming cride is the data you want to store
    console.log(cride)
    window.location.href="stats.html";//משנה את כתובת האתר הנוכחית של הדפדפן
}

function cride() {
    uid = JSON.parse(localStorage.getItem("uid"));
    cridePath = 'id:' + uid + '/cride';
    firebase.database().ref(cridePath).on('value', function(snapshot) {
        crideData = snapshot.val(); // Retrieve data from Firebase
        saveCrideToSessionStorage(crideData); // Save data to sessionStorage
    });
    
}

function history() {
    cride = JSON.parse(sessionStorage.getItem("cride"));
    uid = JSON.parse(localStorage.getItem("uid"));
    ride=JSON.parse(sessionStorage.getItem("ride"));
    sec = JSON.parse(sessionStorage.getItem("seconds"));
    min = JSON.parse(sessionStorage.getItem("minutes"));
    time=sec+min*60
    kmhmax=JSON.parse(sessionStorage.getItem("kmhmax"));
    bpmmax=JSON.parse(sessionStorage.getItem("bpmmax"));
    
    firebase.database().ref(`id:${uid}/ride:${cride}/seconds`).set(sec);
    firebase.database().ref(`id:${uid}/ride:${cride}/minutes`).set(min);
    firebase.database().ref(`id:${uid}/ride:${cride}/avgkmh`).set(kmhmax/time);
    firebase.database().ref(`id:${uid}/ride:${cride}/avgdis`).set((kmhmax/3600)*time);
    firebase.database().ref(`id:${uid}/ride:${cride}/avgbpm`).set(bpmmax/time);
    firebase.database().ref(`id:${uid}/cride`).set(cride+1);
    sessionStorage.setItem("cride", JSON.stringify(cride+1));
    firebase.database().ref(`id:${uid}/ride`).set(ride);
}

function average(){
    kmh=JSON.parse(sessionStorage.getItem("kmh"));
    kmhmax=JSON.parse(sessionStorage.getItem("kmhmax")); 
    bpm=JSON.parse(sessionStorage.getItem("bpm"));
    bpmmax=JSON.parse(sessionStorage.getItem("bpmmax"));

    sessionStorage.setItem("kmhmax", JSON.stringify(kmhmax+kmh));
    sessionStorage.setItem("bpmmax", JSON.stringify(bpmmax+bpm));
}

function avgdisplay(){
    ride = JSON.parse(sessionStorage.getItem("ride"));
    newtext = 'Ride ' + ride;
    document.getElementById("replace").innerHTML = newtext;
    if(ride==0){
        change4 = document.getElementById("oneb");//מקשר אלמנת יחודי למישתנה
        change4.style.display = "none";//מגדיר את מאפיין התצוגה שהופך את האלמנט לגלוי
    }
    updateride();
    showimage();
}

function reset(){
    sessionStorage.setItem("kmhmax", JSON.stringify(0));
    sessionStorage.setItem("distancemax", JSON.stringify(0));
    sessionStorage.setItem("bpmmax", JSON.stringify(0));
}

imageCounter = 1;

function takePicture() {
    camip = JSON.parse(sessionStorage.getItem("camip"));
    camlink="http://" + camip + "/capture?timestamp=";
    newImage = camlink + new Date().getTime() + "&counter=" + imageCounter;
    document.getElementById('capturedImage').src = newImage;
    imageCounter++;
    uploadImage();
}   
function uploadImage() {
    camip = JSON.parse(sessionStorage.getItem("camip"));
    camlink="http://" + camip + "/capture?timestamp=";
    cride = JSON.parse(sessionStorage.getItem("cride"));
    uid = JSON.parse(localStorage.getItem("uid"));
    newImage = camlink + new Date().getTime() + "&counter=" + imageCounter; // URL of the captured image
    // Create a reference to the Firebase Storage bucket
    storageRef = firebase.storage().ref();
    // Fetch the image data (assuming cross-origin issues are handled on the server)
    fetch(newImage)
      .then(response => response.blob())
    .then(blob => {
        // Set a filename for the uploaded image
        imageName = "image_" + Date.now() + ".jpg"; // Change the filename if needed
        // Upload image to Firebase Storage
        storageRef.child(uid +'/'+cride+'/'+ imageName).put(blob)
    })
  }



  function showimage() {
    // Replace 'uid' and 'cride' with your actual values
    uid = JSON.parse(localStorage.getItem("uid"));
    ride = JSON.parse(sessionStorage.getItem("ride"));
  
    const storageRef = firebase.storage().ref().child(`${uid}/${ride}`);
    const imageContainer = document.getElementById('imageContainer');
  
    // Clear the existing images from the container
    while (imageContainer.firstChild) {
      imageContainer.removeChild(imageContainer.firstChild);
    }
  
    // Get the list of files in the folder
    storageRef.listAll()
      .then((result) => {
        result.items.forEach((imageRef) => {
          imageRef.getDownloadURL()
            .then((url) => {
              const img = document.createElement('img');
              img.src = url;
              imageContainer.appendChild(img);
            });
        });
      });
  }
  



//     This code sends a two bit variable to firebase/////////////////////////////////////////////////////////////
timerp=0
function piezo() {
    button = document.getElementById('piezo');
    piezov = JSON.parse(sessionStorage.getItem("piezov"));
    firebase.database().ref('/uln_data' ).set(1);
    piezov = 1;
    sessionStorage.setItem("piezov", JSON.stringify(piezov));
    timerp = setInterval(updatepiezo, 1500);//מגדיר טיימר חוזר שמפעיל פונקציה כל שנייה
    
}

function updatepiezo(){
    firebase.database().ref('/uln_data' ).set(0);
    clearInterval(timerp);//מהפס את התיימר
    timerp=0//משנה את הערך של המשתנה
}

function silo() {
    button = document.getElementById('silo');
    silov = JSON.parse(sessionStorage.getItem("silov"));
    if (silov==1) {
        button.style.backgroundColor = 'red';
        silov = 0;
    } else {
        button.style.backgroundColor = 'green';
        silov = 1;
    }
    sessionStorage.setItem("silov", JSON.stringify(silov));
    console.log('Silonoid value:', silov);
    send();
}


function send(){
    let da=0;
    piezov = JSON.parse(sessionStorage.getItem("piezov"));
    console.log(piezov)
    silov = JSON.parse(sessionStorage.getItem("silov"));
    if (piezov==1)
        da=da+2
    if(silov==1)
        da=da+1
console.log("da=",da)
firebase.database().ref('/data' ).set(da);
}
function maxbpm(){
    bpm = document.getElementById("bpm");//מקשר אלמנת יחודי למישתנה
    if(bpm>200)
    firebase.database().ref('/gbpm' ).set(0);
    else
    firebase.database().ref('/gbpm' ).set(1);
}
