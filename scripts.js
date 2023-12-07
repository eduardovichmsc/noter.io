
$('.start-button').on('click', function(){
   if($('.auth-input').val()){
      localStorage.activeUser = $('.auth-input').val();
      activeUser = localStorage.activeUser;
      $('.welcome-wrapper').fadeOut(100);
      checkActiveUser();
      window.location.href="";
} else {
      $('.auth-warning').show(100);
   }
});

function checkActiveUser(){
   if(!localStorage.activeUser) {
      $('.welcome-wrapper').fadeIn(100);
   } else {
      $('.username').text(localStorage.activeUser);
      $('.main-container').fadeIn(500);
   }
}
checkActiveUser();



$('.erase-data').on('click', function(){
   localStorage.clear();
   window.location.href="";
});