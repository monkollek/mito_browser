import React from 'react';
import Rrna1Zoom from './rRNA/MT-RNR1-zoom';
import Rrna1Orig from './rRNA/MT-RNR1-orig';
import Rrna2Zoom from './rRNA/MT-RNR2-zoom';
import Rrna2Orig from './rRNA/MT-RNR2-orig';

class RrnaSVG extends React.Component{

    render(){
        var variant = this.props.variant;
        var gene = this.props.gene;
        if(gene=="MT-RNR1"){
            return(
                <div style={{position:'absolute'}}>
                    
                    <Rrna1Zoom variant={variant} />
                    <Rrna1Orig variant={variant}/>
                    <svg height="900" width="500" style={{position: "absolute", left:'0', top:'0'}} xmlns="http://www.w3.org/2000/svg">
                        <rect x="0" y="0" height="800" width="500" style={{strokeWidth:"2",stroke:"black",fill:"none"}}></rect>
                    </svg>
                    
                </div>
            )
        } else if(gene=="MT-RNR2") {
            return(
                <div style={{position:'absolute'}}>
                    
                    <Rrna2Zoom variant={variant} />
                    <Rrna2Orig variant={variant}/>
                    <svg height="900" width="500" style={{position: "absolute", left:'0', top:'0'}} xmlns="http://www.w3.org/2000/svg">
                        <rect x="0" y="0" height="800" width="500" style={{strokeWidth:"2",stroke:"black",fill:"none"}}></rect>
                    </svg>
                    
                </div>
            )
        } else {return null}
    }
}

export default RrnaSVG;
