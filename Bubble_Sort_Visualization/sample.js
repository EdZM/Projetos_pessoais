
var sample = function () {
    this.values = [];
    this.bar_width;


    this.swap = function (indexA, indexB) {
        var temp = this.values[indexA];
        this.values[indexA] = this.values[indexB];
        this.values[indexB] = temp;
        //this.highlight(indexA);

    }

    this.highlight = function(index){
        
        var y = height - this.values[index];
        var w = this.bar_width;
        var x = index * w;


        stroke(0);
        fill(255, 0, 0);
        //line(index, height, index, height - this.values[index]);
    
        //rect(index, height - this.values[index], h, this.values[index]);
        rect(x, y, w, this.values[index]);    



    }

}