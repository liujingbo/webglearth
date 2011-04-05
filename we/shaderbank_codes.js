/*
 * Copyright (C) 2011 Klokan Technologies GmbH (info@klokantech.com)
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU GPL for more details.
 *
 * USE OF THIS CODE OR ANY PART OF IT IN A NONFREE SOFTWARE IS NOT ALLOWED
 * WITHOUT PRIOR WRITTEN PERMISSION FROM KLOKAN TECHNOLOGIES GMBH.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 */

/**
 * @fileoverview This file is automatically generated from all *.glsl files
 * Notes:
 *    All comments are trimmed.
 *    All lines starting with # has to start and end with newline symbol.
 *    All leading and trailing spaces are trimmed.
 *    All redundant whitespace can be reduced to single space. (Not yet implemented)
 */

goog.provide('we.shaderbank.codes');


/** @type {string} */
we.shaderbank.codes['earth-fs.glsl'] = 'precision mediump float;uniform sampler2D uBufferL0;uniform sampler2D uBufferL1;uniform sampler2D uBufferL2;uniform sampler2D uBufferLn;varying float vFallbackA;varying vec2 vTCA;void main(){float fallback=floor(vFallbackA+0.5);if(fallback==0.0){gl_FragColor=texture2D(uBufferL0,vTCA);}else if(fallback==1.0){gl_FragColor=texture2D(uBufferL1,vTCA);}else if(fallback==2.0){gl_FragColor=texture2D(uBufferL2,vTCA);}else if(fallback==-1.0){gl_FragColor=texture2D(uBufferLn,vTCA);}else{discard;}}';


/** @type {string} */
we.shaderbank.codes['earth-vs.glsl'] = '#define BUFF_SIDE %BUFFER_SIDE_FLOAT%\n#define BUFF_SIZE int(BUFF_SIDE*BUFF_SIDE)\n#define TERRAIN %TERRAIN_BOOL%\n#define BUFF_SIDE_T %BUFFER_SIDE_T_FLOAT%\n#define BUFF_SIZE_T int(BUFF_SIDE_T*BUFF_SIDE_T)\nprecision highp float;const float PI=3.1415927;const float PI2=6.2831855;const float EARTH_RADIUS=6378137.0;attribute vec2 aVertexPosition;attribute vec2 aTextureCoord;uniform mat4 uMVPMatrix;uniform float uTileCount;uniform vec2 uOffset;uniform float uMetaL0[BUFF_SIZE];uniform float uMetaL1[BUFF_SIZE];uniform float uMetaL2[BUFF_SIZE];uniform vec2 uOffL[3];varying float vFallbackA;varying vec2 vTCA;\n#if TERRAIN\nuniform float uMetaL0T[BUFF_SIZE_T];uniform float uMetaL1T[BUFF_SIZE_T];uniform vec2 uOffLT[2];uniform sampler2D uBufferL0T;uniform sampler2D uBufferL1T;uniform sampler2D uBufferLnT;uniform float uDegradationT;bool validateOffsetT(vec2 off){return off.x>=0.0&&off.y>=0.0&&off.x<BUFF_SIDE_T&&off.y<BUFF_SIDE_T;}\n#endif\nbool validateOffset(vec2 off){return off.x>=0.0&&off.y>=0.0&&off.x<BUFF_SIDE&&off.y<BUFF_SIDE;}vec2 modFirst(vec2 x,float y){return vec2(x.x-y*floor(x.x/y),x.y);}void main(){vec2 phi=PI2*vec2(aVertexPosition.x+uOffset.x,aVertexPosition.y+uOffset.y)/uTileCount;if(abs(phi.y)>PI){vFallbackA=-2.0;return;}vec2 tileCoords=vec2(mod(aVertexPosition.x-aTextureCoord.x+uOffset.x+uTileCount*0.5,uTileCount),-aTextureCoord.y-aVertexPosition.y-uOffset.y+uTileCount*0.5);float elev=0.0;\n#if TERRAIN\nvec2 TCT;float fallbackT=-1.0;float degradationModifier=exp2(uDegradationT);vec2 offT=modFirst(tileCoords/degradationModifier-uOffLT[0],uTileCount/degradationModifier);float rawElev=0.0;if(validateOffsetT(offT)&&uMetaL0T[int(floor(offT.y)*BUFF_SIDE_T+offT.x)]==1.0){fallbackT=0.0;}else{offT=modFirst((tileCoords/(2.0*degradationModifier))-uOffLT[1],uTileCount/(2.0*degradationModifier));if(validateOffsetT(offT)&&uMetaL1T[int(floor(offT.y)*BUFF_SIDE_T+offT.x)]==1.0){fallbackT=1.0;}else{TCT=(tileCoords+aTextureCoord)/uTileCount;}}if(fallbackT>=0.0){TCT=(offT+aTextureCoord/(exp2(fallbackT)*degradationModifier)+mod(uOffLT[int(fallbackT)],BUFF_SIDE_T))/BUFF_SIDE_T;}TCT.y=1.0-TCT.y;if(fallbackT==0.0){rawElev=texture2D(uBufferL0T,TCT).r;}else if(fallbackT==1.0){rawElev=texture2D(uBufferL1T,TCT).r;}else{rawElev=texture2D(uBufferLnT,TCT).r;}elev=rawElev*8248.0/EARTH_RADIUS;\n#endif\nfloat exp_2y=exp(2.0*phi.y);float tanh=((exp_2y-1.0)/(exp_2y+1.0));float cosy=sqrt(1.0-tanh*tanh);vec3 pos=vec3(sin(phi.x)*cosy,tanh,cos(phi.x)*cosy);gl_Position=uMVPMatrix*vec4(pos*(1.0+elev),1.0);vFallbackA=-1.0;vec2 off=modFirst(tileCoords-uOffL[0],uTileCount);if(validateOffset(off)&&uMetaL0[int(floor(off.y)*BUFF_SIDE+off.x)]==1.0){vFallbackA=0.0;}else{off=modFirst((tileCoords/2.0)-uOffL[1],uTileCount/2.0);if(validateOffset(off)&&uMetaL1[int(floor(off.y)*BUFF_SIDE+off.x)]==1.0){vFallbackA=1.0;}else{off=modFirst((tileCoords/4.0)-uOffL[2],uTileCount/4.0);if(validateOffset(off)&&uMetaL2[int(floor(off.y)*BUFF_SIDE+off.x)]==1.0){vFallbackA=2.0;}}}if(vFallbackA>=0.0){vTCA=(off+aTextureCoord/exp2(vFallbackA)+mod(uOffL[int(vFallbackA)],BUFF_SIDE))/BUFF_SIDE;}else{vTCA=(tileCoords+aTextureCoord)/uTileCount;}vTCA.y=1.0-vTCA.y;}';
