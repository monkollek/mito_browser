import React from 'react';

class Mttp extends React.Component{
    
    componentDidMount(){
        //set styles
        var allLines = document.getElementsByTagName('line');
        for(var t of allLines){
            t.setAttribute('stroke',"#2975d9");
            t.setAttribute('stroke-width',"1");
            t.setAttribute('stroke-linecap',"round");
        }
        var allCircles = document.getElementsByTagName('circle');
        for(var t of allCircles){
            t.setAttribute('fill', '#b30000');
        }
        var allText = document.getElementsByTagName('text');
        for(var t of allText){
            t.setAttribute('font-size', '12');
            t.setAttribute('fill', '#000000');
            t.setAttribute('font-family', 'monospace');
        }
        
        //highlight variant
        var variant = this.props.variant;
        var allText = document.getElementsByTagName('title');
        for(var t of allText){
            if(t.innerHTML==variant){
                var textNode = t.parentElement;
                textNode.setAttribute('font-weight',"bold");
                textNode.setAttribute('font-size',"15");
                textNode.setAttribute('fill',"crimson");
                var newX = parseFloat(textNode.getAttribute('x'))-1;
                var newY = parseFloat(textNode.getAttribute('y'))+1.5;
                textNode.setAttribute('x',newX);
                textNode.setAttribute('y',newY);
                textNode.setAttribute('id', 'highlight');

                //add circle for background color of highlight
                var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
                circle.setAttribute('cx',newX+4);
                circle.setAttribute('cy',newY-5);
                circle.setAttribute('r',9);
                circle.setAttribute('fill','yellow');
                var svgnode = document.getElementById("svg-container"); 
                svgnode.insertBefore(circle, svgnode.childNodes[0]);
            }
        }

    }

    render() {
        
        return(
            <svg id="svg-container" height="350" width="350" xmlns="http://www.w3.org/2000/svg">
                
                <text x="205" y="10" >A<title></title> </text>
                <text x="205" y="25" >C<title></title> </text>
                <text x="205" y="40" >C<title></title> </text>
                <text x="205" y="55" >A<title>15956</title> </text>
                <text x="205" y="70" >G<title>15957</title> </text>
                <text x="205" y="85" >T<title>15958</title> </text>
                <text x="205" y="100" >C<title>15959</title> </text>
                <text x="205" y="115" >T<title>15960</title> </text>
                <text x="205" y="130" >C<title>15961</title> </text>
                <text x="205" y="145" >T<title>15962</title> </text>
                <text x="205" y="160" >T<title>15963</title> </text>
                <text x="218" y="170" >T<title>15964</title> </text>
                <text x="231" y="170" >T<title>15965</title> </text>
                <text x="244" y="170" >T<title>15966</title> </text>
                <text x="257" y="170" >C<title>15967</title> </text>
                <text x="269" y="163" >A<title>15968</title> </text>
                <text x="281" y="160" >G<title>15969</title> </text>
                <text x="293" y="168" >A<title>15970</title> </text>
                <text x="299" y="181.5" >A<title>15971</title> </text>
                <text x="293" y="195" >A<title>15972</title> </text>
                <text x="281" y="203" >T<title>15973</title> </text>
                <text x="269" y="200" >T<title>15974</title> </text>
                <text x="257" y="193" >G<title>15975</title> </text>
                <text x="244" y="193" >A<title>15976</title> </text>
                <text x="231" y="193" >G<title>15977</title> </text>
                <text x="218" y="193" >G<title>15978</title> </text>
                <text x="220" y="205" >T<title>15979</title> </text>
                <text x="226" y="215" >G<title>15980</title> </text>
                <text x="218" y="225" >G<title>15981</title> </text>
                <text x="206" y="228" >T<title>15982</title> </text>
                <text x="200" y="238" >A<title>15983</title> </text>
                <text x="200" y="253" >A<title>15984</title> </text>
                <text x="200" y="268" >T<title>15985</title> </text>
                <text x="200" y="283" >C<title>15986</title> </text>
                <text x="200" y="298" >G<title>15987</title> </text>
                <text x="208" y="308" >T<title>15988</title> </text>
                <text x="208" y="323" >G<title>15989</title> </text>
                <text x="200" y="334" >G<title>15990</title> </text>
                <text x="187.5" y="336" >G<title>15991</title> </text>
                <text x="175" y="334" >T<title>15992</title> </text>
                <text x="167" y="323" >T<title>15993</title> </text>
                <text x="167" y="308" >T<title>15994</title> </text>
                <text x="175" y="298" >C<title>15995</title> </text>
                <text x="175" y="283" >G<title>15996</title> </text>
                <text x="175" y="268" >A<title>15997</title> </text>
                <text x="175" y="253" >T<title>15998</title> </text>
                <text x="175" y="238" >T<title>15999</title> </text>
                <text x="163" y="228" >C<title>16000</title> </text>
                <text x="152" y="215" >T<title>16001</title> </text>
                <text x="139" y="215" >A<title>16002</title> </text>
                <text x="126" y="215" >A<title>16003</title> </text>
                <text x="113" y="215" >G<title>16004</title> </text>
                <text x="100" y="222" >A<title>16005</title> </text>
                <text x="87" y="222" >T<title>16006</title> </text>
                <text x="74" y="210" >T<title>16007</title> </text>
                <text x="74" y="194.5" >A<title>16008</title> </text>
                <text x="87" y="185" >A<title>16009</title> </text>
                <text x="100" y="185" >A<title>16010</title> </text>
                <text x="113" y="192" >T<title>16011</title> </text>
                <text x="126" y="192" >T<title>16012</title> </text>
                <text x="139" y="192" >T<title>16013</title> </text>
                <text x="152" y="192" >G<title>16014</title> </text>
                <text x="163" y="183" >A<title>16015</title> </text>
                <text x="173" y="173" >T<title>16016</title> </text>
                <text x="180" y="160" >A<title>16017</title> </text>
                <text x="180" y="145" >A<title>16018</title> </text>
                <text x="180" y="130" >G<title>16019</title> </text>
                <text x="180" y="115" >A<title>16020</title> </text>
                <text x="180" y="100" >G<title>16021</title> </text>
                <text x="180" y="85" >A<title>16022</title> </text>
                <text x="180" y="70" >C<title>16023</title> </text>
                <line x1="190" y1="67" x2="203" y2="67" ><title>190,67 203,67</title> </line>
                <line x1="190" y1="82" x2="203" y2="82" ><title>190,82 203,82</title> </line>
                <line x1="190" y1="97" x2="203" y2="97" ><title>190,97 203,97</title> </line>
                <line x1="190" y1="112" x2="203" y2="112" ><title>190,112 203,112</title> </line>
                <line x1="190" y1="127" x2="203" y2="127" ><title>190,127 203,127</title> </line>
                <line x1="190" y1="142" x2="203" y2="142" ><title>190,142 203,142</title> </line>
                <line x1="190" y1="157" x2="203" y2="157" ><title>190,157 203,157</title> </line>
                <circle cx="222" cy="177" r="2"><title>222,177</title> </circle>
                <circle cx="235" cy="177" r="2"><title>235,177</title> </circle>
                <line x1="248" y1="173" x2="248" y2="183" ><title>248,173 248,183</title> </line>
                <line x1="261" y1="173" x2="261" y2="183" ><title>261,173 261,183</title> </line>
                <line x1="185" y1="235" x2="198" y2="235" ><title>185,235 198,235</title> </line>
                <line x1="185" y1="250" x2="198" y2="250" ><title>185,250 198,250</title> </line>
                <line x1="185" y1="265" x2="198" y2="265" ><title>185,265 198,265</title> </line>
                <line x1="185" y1="280" x2="198" y2="280" ><title>185,280 198,280</title> </line>
                <line x1="185" y1="295" x2="198" y2="295" ><title>185,295 198,295</title> </line>
                <circle cx="117" cy="200" r="2"><title>117,200</title> </circle>
                <line x1="130" y1="195" x2="130" y2="205" ><title>130,195 130,205</title> </line>
                <line x1="143" y1="195" x2="143" y2="205" ><title>143,195 143,205</title> </line>
                <circle cx="156" cy="200" r="2"><title>156,200</title> </circle>
            </svg>

        )
    }
    
}

export default Mttp;