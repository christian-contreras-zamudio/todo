$(document).ready(function(){
    $('.data-table').DataTable({
        "order": [[ 0, "desc" ]],
		stateSave: true,
        "scrollX": true,
        "processing": true,
		"deferRender": true,
		"pagingType": "full_numbers",
        "lengthMenu": [ [-1, 10, 25, 50, 100], ["Todo", 10, 25, 50, 100] ]
    });
});