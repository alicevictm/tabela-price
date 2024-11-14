function calcula() {
    const b = document.getElementById('vb').value;
    const c = document.getElementById('vc').value;

    let delta = (b*b)-(4*a*c);
    let rd = Math.sqrt(delta);

    if(delta > 0){
        let x1 = (-b+rd)/(2*a);
        let x2 = (-b-rd)/(2*a);
        document.getElementById('r1').innerText = "x1 = " + x1;
        document.getElementById('r2').innerText = "x2 = " + x1;
    }else if(delta == 0){
        let xu = (-b)/(2*a);
        document.getElementById('r1').innerText = "x único = " + xu;
    }else{
        document.getElementById('r1').innerText = "não há raiz real";
    }
}
