function showPage(id) {
    const pages = document.querySelectorAll('.page');
    console.log(pages);
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById('page5').style.display='none';
    if (id === 'page5') {
        document.getElementById('page5').style.display = 'block'
    }
    document.getElementById(id).classList.add('active');
}   


const showpage = (id) => {
    
}
