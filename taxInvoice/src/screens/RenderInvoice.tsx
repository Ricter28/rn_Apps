import React, { Component } from "react";
import { WebView } from "react-native-webview";
import RenderHtml from "react-native-render-html";
import { ScrollView } from "react-native-gesture-handler";
import layout from "contant/layout";
import { StyleSheet, Text, View } from "react-native";
import HeaderScreen from "components/headers/HeaderScreen";
import moment from "moment";
import { useSelector } from "react-redux";
import FastImage from "react-native-fast-image";

const RenderInvoice = (props: any) => {
  const webview = null;
  const { listInvoice,partner,title,website,phone,address } = props.route.params;
  let user = useSelector((state: any) => state.userReducer.user);
  // const total = listInvoice.reduce(
  //   (accumulator: any, item: any) =>
  //     Number(accumulator.total) + Number(item.total)
  // );
  let sum = 0;

  listInvoice.forEach(function(item:any) {
      sum += Number(item.total);
  });

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <HeaderScreen title="" back />

      {/* <View style={styles.wrapTitleInvoice}>
        <Text style={styles.name}>{partner.name}</Text>
        <Text style={styles.txt}>{partner.address}</Text>
        <Text style={[styles.txt,{transform: [{ rotateX: '5deg'}]}]}>{partner.website}</Text>
        <Text style={styles.txt}>{partner.phone}</Text>
      </View> */}
      <WebView
        style={{
          width: layout.widthScreen,
          height: layout.heightScreen,
          marginTop: 0,
        }}
        // ref={(ref) => (this.webview = ref)}

        source={{
          html: `<html lang="en">
            <head>
             <meta charset="utf-8">
             <title>Example 1</title>
           </head>
           <style> 
          
             a {
               color: #5D6975;
               text-decoration: underline;
             }
             
             body {
               position: relative;
               width: 25cm;  
               height: 50cm; 
               margin: 0 auto; 
               color: #001028;
               background: #fff; 
               font-family: Arial, sans-serif; 
               font-size: 12px; 
               font-family: Arial;            
             }
             
             header {
               padding: 10px 0;
               margin-bottom: 30px;
             }
             
             #logo {
               text-align: center;
               margin-bottom: 10px;
             }
             
             #logo img {
               width: 90px;
             }
             
             h1 {
               border-top: 1px solid  #5D6975;
               border-bottom: 1px solid  #5D6975;
               color: #5D6975;
               font-size: 6em;
               line-height: 1.4em;
               font-weight: normal;
               text-align: center;
               margin: 0 0 20px 0;
               background: url(dimension.png);
             }
             
             #project {
               float: left;
               margin-bottom:50px
             }
             
             #project span {
               color: black;
               text-align: right;
               width: 52px;
               margin-right: 50px;
               display: inline-block;
               font-size: 3em;
               margin-bottom:5px;
               font-family: Arial; 
             }
             span {
              color: black;
              text-align: left; 
              display: inline-block;
              font-size: 4em;
              margin-bottom:10px;
              width:50%;
              font-family: Inter;
            }
             #company {
               float: right;
               text-align: right;
             }
             
             #project div,
             #company div {
               white-space: nowrap;        
             }
             
             table {
               width: 100%;
               border-collapse: collapse;
               border-spacing: 0;
               margin-bottom: 20px;
             }
             
             table tr:nth-child(2n-1) td {
               background: #F5F5F5;
             }
             
             table th,
             table td {
               text-align: center;
               
             }
             
             table th {
               padding: 5px 20px;
               color: #5D6975;
               border-bottom: 1px solid #C1CED9;
               white-space: nowrap;        
               font-weight: normal;
               font-size: 2em;
             }
             
             table .service,
             table .desc {
               text-align: left
             }
             
             table td {
               padding: 20px;
               text-align: right;
             }
             
             table td.service,
             table td.desc {
               vertical-align: top;
               font-size: 2em;

             }
             
             table td.unit,
             table td.qty,
             table td.total {
               font-size: 2em;
               text-align:center
             }
             
             table td.grand {
               border-top: 1px solid #5D6975;;
             }
             
             #notices .notice {
               color: #5D6975;
               font-size: 2em;
             }
             
             footer {
               color: #5D6975;
               width: 100%;
               height: 30px;
               position: absolute;
               bottom: 0;
               border-top: 1px solid #C1CED9;
               padding: 8px 0;
               text-align: center;
             } 
              </style>
           <body>
             <header class="clearfix">
             
               <div style='margin-bottom:50px'>
               <div><span style='font-size:6em'> ${partner.name}</span> </div>
               <div><span> ${partner.address}</span><td> </td></div>
               <div><span> <a >${partner.website}</a></span> </div>
               <div><span>${partner.phone}</span></div>
               </div>
             
               <h1>${title}</h1>
        
               <div id="project">
          
                 <div><span> ${''}</span> </div>
                 <div><span>${address}</span><td> </td></div>
                 <div><span> <a>${website}</a></span> </div>
                 <div><span> ${moment().format('DD/MM/YY')}</span></div>
       
               </div
             </header>
             <main>
               <table>
                 <thead>
                   <tr>
                     <th class="desc">DESCRIPTION</th>
                     <th>QTY/HR</th>
                     <th>PRICE</th>
                     <th>TOTAL</th>
                   </tr>
                 </thead>
                 <tbody>
   
                
             ${listInvoice.map(
               (item: any, index) => 
               `<tr>
        
             <td class="desc">${item.description}</td>
             <td class="qty">${item.QTY}</td>
             <td class="unit">${item.unitPrice}</td>
      
             <td class="total">$ ${item.total}</td>
           </tr>`
             )}
                  
   
        
   
                   <tr>
                     <td  colspan="3" class="grand total">TOTAL TAX</td>
                     <td class="grand total">$ ${sum}</td>
                   </tr>
   
                 </tbody>
               </table>
               <div id="notices">
                 <div>NOTICE:</div>
                 <div class="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
               </div>
             </main>
             <footer>
               Invoice was created on a computer and is valid without the signature and seal.
             </footer>
           </body>
           </html>`,
        }}
        //   onNavigationStateChange={this.handleWebViewNavigationStateChange}
      />
    </ScrollView>
  );
};
export default RenderInvoice;

const styles = StyleSheet.create({
  wrapTitleInvoice: {
    paddingHorizontal:10
  },
  txt:{
    // fontFamily:'Inter-Regular',
    fontStyle:'italic',
    textDecorationLine:'underline',
  },
  website:{

  }
});
