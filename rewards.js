var script = document.createElement('script');
document.getElementsByTagName('head')[0].appendChild(script);
setTimeout(function(){
   $('.rewards-container').css('text-align','center');
   $('.rewards-container').append('</section><section class="elementor-section elementor-top-section elementor-element elementor-element-d8d36e2 elementor-section-boxed elementor-section-height-default elementor-section-height-default"><input class="button big color-white round outline customize-unpreviewable address" placeholder="Your Address" style="width: 60%;border:2px solid gray;border-radius:30px;color: #282846;padding: 7px 15px;"><button class="button big color-1 round customize-unpreviewable findrewards" style="padding: 10px;margin-left: 5px;border-radius: 20px;;background-color: #ffc93c;border:0px;color: #282846;font-weight: bolder;">Track Rewards</button><div class="resultsaccumulated" style="color:white"></div><div class="results" style="color:white"></div><br><br>');

   $('.findrewards').click(function(){
      $('.resultsaccumulated').html("<img src='dolargirando.gif' width='10%'>");
      $('.results').hide();
      var address=$('.address').val();//'0x5d78508de9D45eD7Ad54231E74b7Ee09a49E40D4';
      var btcprice=56800;

      var url="https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe&address="+address+"&page=1&offset=1000&startblock=0&endblock=999999999&sort=des&apikey=KZYGIBNMVIBAPEK2XUICAU66T8RIHWTGBH";

      $.ajax({
            type: 'GET',
            url: url,
            dataType: "json",
            success: function(data){
              var url2="https://api.binance.com/api/v3/avgPrice?symbol=XRPUSDT";
              $.ajax({
                type: 'GET',
                url: url2,
                dataType: "json",
                success: function(data2){
                  btcprice=Number(data2.price);
                  var BTC=0;
                  var USD=0;
                  var history="";
                  for (var i in data.result){
                      var aux=data.result[i];
                      if (aux.to.toLowerCase()==address.toLowerCase() && aux.from.toLowerCase()=="0x8d4dcc2fb75395703d9e596c4adb730e752256cb"){
                          var ts=Number(aux.timeStamp);
                          var ts_ms = ts * 1000;
                          var date_ob = new Date(ts_ms);
                          var year = date_ob.getFullYear();
                          var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                          var date = ("0" + date_ob.getDate()).slice(-2);
                          var hours = ("0" + date_ob.getHours()).slice(-2);
                          var minutes = ("0" + date_ob.getMinutes()).slice(-2);
                          var seconds = ("0" + date_ob.getSeconds()).slice(-2);
                          var fecha=year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

                          var btcval=Number(aux.value)/1000000000000000000;
                          var usdval=(Number(aux.value)/1000000000000000000)*btcprice;
                          history=fecha+' - XRP '+btcval.toFixed(8)+' ($'+usdval.toFixed(2)+')<br>'+history;
                          BTC+=btcval;
                          USD+=usdval;
                      }
                  }
                  $('.resultsaccumulated').html('<h4 style="color: white;font-size:24px">Accumulated Rewards<br> XRP '+BTC.toFixed(8)+' ($'+USD.toFixed(2)+')</h4>');
                  //$('.results').html(history);
                  //$('.results').show();
                }
              });
                  
            }
      });
      return false;
  });
},1000);