function hello() {
    $('path').on('click', function () {
        var place = ($(this).attr('name'));
        document.getElementsByClassName('card-title')[0].innerHTML = place
        start_up()

        function start_up() {
            get_data("https://api.covid19india.org/state_district_wise.json");
        }

        function get_data(url) {
            $.getJSON(url, function (data) {
                var states_data = parse_states_data(data);
            });
        }

        function parse_states_data(data) {

            var states = [];

            for (state in data) {
                var confirmed = 0;
                var deceased = 0;
                var recovered = 0;

                for (var district in data[state]["districtData"]) {
                    confirmed += data[state]["districtData"][district]["confirmed"];
                    deceased += data[state]["districtData"][district]["deceased"];
                    recovered += data[state]["districtData"][district]["recovered"];
                }

                states.push([state, confirmed, recovered, deceased]);
            }

            states.forEach(function (value, i) {
                // console.log(i + " : " + value[0])
                if (value.includes(place, 0)) {
                    // console.log(i + ' : ' + value)
                    const open_div = `<div class="card w-25">
                                        <div class="card-body">
                                            <h5 class="card-title">`

                    const open_div_2 = `</h5>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">`

                    const close_div = `</li>
                                        <li class="list-group-item">`

                    const end_div = `</li>  </ul>   </div>  </div>`

                    $('body').append(open_div + value[0] + open_div_2 + '<b>Confirmed : </b>' + value[1] + close_div + '<b>Recovered : </b>'
                                         + value[2] + close_div + '<b>Deceased : </b>' + value[3] + end_div)
                }
            })

            // console.log(states);

        }
    });
}

