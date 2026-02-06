function showPage(id) {
    const target = document.getElementById(id);
      if (!target) return;

    if (target.classList.contains('iamimg')) {
        document.querySelectorAll('.iamimg')
            .forEach(img => img.style.display ='none');
            target.style.display ='block';
            return;
    }
    document.querySelectorAll('.page')
        .forEach(p => p.classList.remove('active'));

    document.querySelectorAll('.iamimg')
        .forEach(img => img.style.display = 'none');

    document.getElementById('page5').style.display ='none';

    if(id === 'page5'){
        document.getElementById('page5').style.display = 'block';
        return;
    }

    target.classList.add('active');
}
