function genData() {
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: '/books',
        success: function(data) {
            var str = ""
            for(var i = 0; i < data.books.length; i++) {
                var row = "<table><tr><td>NAME</td><td>"+data.books[i].title+"</td></tr>";
                row += "<tr><td>ISBN</td><td>"+data.books[i].isbn+"</td></tr>";
                row += "<tr><td>AUTHOR</td><td>"+data.books[i].author+"</td></tr>";
                row += "<tr><td>PUBLISHER</td><td>"+data.books[i].publisher+"</td></tr>";
                row += "<tr><td>DESC</td><td>"+data.books[i].description+"</td></tr</table>";
                str += row+"<br><br>";
            }
            $("#bktable").append(str);
        }
    });
}

$(document).ready(function() {
    genData();
});