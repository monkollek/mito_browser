import React from 'react';

class Mtti extends React.Component{
    
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
                
                <text x="205" y="10"> A<title></title> </text>
                <text x="205" y="25"> C<title></title> </text>
                <text x="205" y="40"> C<title></title> </text>
                <text x="205" y="55"> A<title>4331</title> </text>
                <text x="205" y="70"> T<title>4330</title> </text>
                <text x="205" y="85"> C<title>4329</title> </text>
                <text x="205" y="100"> T<title>4328</title> </text>
                <text x="205" y="115"> T<title>4327</title> </text>
                <text x="205" y="130"> T<title>4326</title> </text>
                <text x="205" y="145"> A<title>4325</title> </text>
                <text x="205" y="160"> T<title>4324</title> </text>
                <text x="218" y="170"> T<title>4323</title> </text>
                <text x="231" y="170"> C<title>4322</title> </text>
                <text x="244" y="170"> C<title>4321</title> </text>
                <text x="257" y="170"> C<title>4320</title> </text>
                <text x="270" y="170"> C<title>4319</title> </text>
                <text x="282" y="163"> C<title>4318</title> </text>
                <text x="294" y="160"> A<title>4317</title> </text>
                <text x="306" y="168"> A<title>4316</title> </text>
                <text x="312" y="181.5"> A<title>4315</title> </text>
                <text x="306" y="195"> T<title>4314</title> </text>
                <text x="294" y="203"> T<title>4313</title> </text>
                <text x="282" y="200"> C<title>4312</title> </text>
                <text x="270" y="193"> G<title>4311</title> </text>
                <text x="257" y="193"> A<title>4310</title> </text>
                <text x="244" y="193"> G<title>4309</title> </text>
                <text x="231" y="193"> G<title>4308</title> </text>
                <text x="218" y="193"> A<title>4307</title> </text>
                <text x="220" y="204"> T<title>4306</title> </text>
                <text x="226" y="210"> A<title>4305</title> </text>
                <text x="223" y="220"> A<title>4304</title> </text>
                <text x="215" y="225"> T<title>4303</title> </text>
                <text x="206" y="228"> A<title>4302</title> </text>
                <text x="200" y="238"> A<title>4301</title> </text>
                <text x="200" y="253"> A<title>4300</title> </text>
                <text x="200" y="268"> T<title>4299</title> </text>
                <text x="200" y="283"> G<title>4298</title> </text>
                <text x="200" y="298"> A<title>4297</title> </text>
                <text x="208" y="308"> G<title>4296</title> </text>
                <text x="208" y="323"> A<title>4295</title> </text>
                <text x="200" y="334"> T<title>4294</title> </text>
                <text x="187.5" y="336"> A<title>4293</title> </text>
                <text x="175" y="334"> G<title>4292</title> </text>
                <text x="167" y="323"> T<title>4291</title> </text>
                <text x="167" y="308"> T<title>4290</title> </text>
                <text x="175" y="298"> T<title>4289</title> </text>
                <text x="175" y="283"> C<title>4288</title> </text>
                <text x="175" y="268"> A<title>4287</title> </text>
                <text x="175" y="253"> T<title>4286</title> </text>
                <text x="175" y="238"> T<title>4285</title> </text>
                <text x="163" y="228"> G<title>4284</title> </text>
                <text x="152" y="215"> A<title>4283</title> </text>
                <text x="139" y="215"> G<title>4282</title> </text>
                <text x="126" y="215"> A<title>4281</title> </text>
                <text x="113" y="222"> A<title>4280</title> </text>
                <text x="100" y="222"> A<title>4279</title> </text>
                <text x="87" y="210"> A<title>4278</title> </text>
                <text x="87" y="194.5"> T<title>4277</title> </text>
                <text x="100" y="185"> A<title>4276</title> </text>
                <text x="113" y="185"> G<title>4275</title> </text>
                <text x="126" y="192"> T<title>4274</title> </text>
                <text x="139" y="192"> C<title>4273</title> </text>
                <text x="152" y="192"> T<title>4272</title> </text>
                <text x="163" y="183"> G<title>4271</title> </text>
                <text x="173" y="173"> T<title>4270</title> </text>
                <text x="180" y="160"> A<title>4269</title> </text>
                <text x="180" y="145"> T<title>4268</title> </text>
                <text x="180" y="130"> A<title>4267</title> </text>
                <text x="180" y="115"> A<title>4266</title> </text>
                <text x="180" y="100"> A<title>4265</title> </text>
                <text x="180" y="85"> G<title>4264</title> </text>
                <text x="180" y="70"> A<title>4263</title> </text>
                <line x1="190" y1="67" x2="203" y2="67"><title>190,67 203,67</title> </line>
                <line x1="190" y1="82" x2="203" y2="82"><title>190,82 203,82</title> </line>
                <line x1="190" y1="97" x2="203" y2="97"><title>190,97 203,97</title> </line>
                <line x1="190" y1="112" x2="203" y2="112"><title>190,112 203,112</title> </line>
                <line x1="190" y1="127" x2="203" y2="127"><title>190,127 203,127</title> </line>
                <line x1="190" y1="142" x2="203" y2="142"><title>190,142 203,142</title> </line>
                <line x1="190" y1="157" x2="203" y2="157"><title>190,157 203,157</title> </line>
                <line x1="222" y1="173" x2="222" y2="183"><title>222,173 222,183</title> </line>
                <line x1="235" y1="173" x2="235" y2="183"><title>235,173 235,183</title> </line>
                <line x1="248" y1="173" x2="248" y2="183"><title>248,173 248,183</title> </line>
                <circle cx="261" cy="177" r="2" ><title>261,177</title> </circle>
                <line x1="274" y1="173" x2="274" y2="183"><title>274,173 274,183</title> </line>
                <line x1="185" y1="235" x2="198" y2="235"><title>185,235 198,235</title> </line>
                <line x1="185" y1="250" x2="198" y2="250"><title>185,250 198,250</title> </line>
                <line x1="185" y1="265" x2="198" y2="265"><title>185,265 198,265</title> </line>
                <line x1="185" y1="280" x2="198" y2="280"><title>185,280 198,280</title> </line>
                <line x1="185" y1="295" x2="198" y2="295"><title>185,295 198,295</title> </line>
                <line x1="130" y1="195" x2="130" y2="205"><title>130,195 130,205</title> </line>
                <line x1="142" y1="195" x2="142" y2="205"><title>142,195 142,205</title> </line>
                <line x1="156" y1="195" x2="156" y2="205"><title>156,195 156,205</title> </line>
            </svg>

        )
    }
    
}

export default Mtti;