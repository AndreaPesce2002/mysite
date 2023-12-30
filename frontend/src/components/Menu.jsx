import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Erba_svg from '../assets/menu/erba.svg';
import Nuvola_svg from '../assets/menu/nuvola.svg';
import Albero_sup_svg from '../assets/menu/albero_sup.svg';
import Albero_inf_svg from '../assets/menu/albero_inf.svg';
import Mongolfiera_svg from '../assets/menu/mongolfiera.svg';
import Logo_svg from '../assets/menu/logo.svg';



//############################-- ANIMATION --############################//
//da tutto scermo si sposta solo in alto
const menuUp = keyframes`

	55%{
		flex-direction: row;
		justify-content: space-evenly;
		align-items: stretch; 
	}
	100%{
		height: 70px;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: stretch; 
	}
`

const menuUpScritte = keyframes`
	10%{
		opacity: 0;
	}
	50%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
`

const scomparsaNuvole = keyframes`
	100%{
		opacity: 0;
	}
`

const scomparsaErba = keyframes`

	100%{
		bottom: -210px;
	}
`

const scomparsaAlbero = keyframes`

	100%{
		bottom: -100px;
	}
`

const scomparsaMongolfiera = keyframes`
	100%{
		top: -70px;
		left: 1%;
	}
`

const viaggioNuvola = keyframes`
	0%{
		left: -5%;
	}
	100%{
		left: 110%;
	}
`

const alberoMossaDalVento = keyframes`
  0%, 100% {
    transform: translateX(0);
	width: 500px;
  }
  50% {
    transform: translateX(5px);
	width: 501px;
  }
`;

const scomparsaLogo = keyframes`
	50%{
		position:relative;
	height: auto;
	bottom:-40px;
	width: 200px;
	right:0%;
	}
	100%{
		bottom:90%;
				width: 100px;
				right:100%
	}
`;

//############################-- CSCC --############################//

//sole
const Sole = styled.div`
    background: yellow;
    border-radius: 50%;
    width: 100px;
    height: 100px;
	position: absolute;
	right: 1%;
	top: 10%;
	transform: translate(-50%, -50%);
	z-index: 11;
`

//Mongolfiera
const Mongolfiera = styled.img.withConfig({
	shouldForwardProp: (prop) => prop !== 'menuAttivo',
})`
    width: 100px;
    height: auto;
	position: absolute;
    left: 20%;
    top: 50px;
	z-index: 11;

	animation: ${({ menuAttivo, reverse }) => {
		if (!menuAttivo) {
			return css`${scomparsaMongolfiera} 4s ease forwards`;
		} else if (menuAttivo && reverse) {
			return css`${scomparsaMongolfiera} 3s ease reverse forwards`;
		} else {
			return 'none';
		}
	}};

`

//albero
const Albero = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== 'menuAttivo',
})`
    width: 550px;
    height: 550px;
	position: absolute;
    right: 1%;
    bottom: 80px;
	z-index: 13;

	animation: ${({ menuAttivo, reverse }) => {
		if (!menuAttivo) {
			return css`${scomparsaAlbero} 4s ease forwards`;
		} else if (menuAttivo && reverse) {
			return css`${scomparsaAlbero} 3s ease reverse forwards`;
		} else {
			return 'none';
		}
	}};

`

//albero
const Albero_sup = styled.img`
	width: 500px;
    height: 500px;
    position: absolute;
    left: 25px;
    top: -40px;
    z-index: 13;

	// Animazione del vento
	animation: ${alberoMossaDalVento} 2s ease-in-out infinite alternate;
`

//albero 
const Albero_inf = styled.img`
width: 250px;
    height: 250px;
    position: absolute;
    left: 150px;
    bottom: 0px;
    z-index: 13;
`

//nuvola
const generaProprietaNuvola = () => {
	return {
		top: Math.random() * 65 + 5,
		animationDuration: Math.random() * 150 + 25,
		animationDelay: -(Math.random() * 150 + 25),
		width: Math.random() * 200 + 50,
		zIndex: Math.round(Math.random() * 3 + 10)
	};
};

const Nuvola = styled.img.attrs(generaProprietaNuvola)`
    width: ${props => props.width}px;
    height: ${props => props.width}px;
    position: absolute;
    top: ${props => props.top}%;
    transform: translate(-50%, -50%);
    z-index: ${props => props.zIndex};
	${({ menuAttivo }) => {
		if (menuAttivo) {
			return css`
			opacity: 1;
		`
		} else {
			return css`
			opacity: 0;
		`
		}
	}}

	animation: ${viaggioNuvola} ${props => props.animationDuration}s ${props => props.animationDelay}s infinite linear;

`;

//erba
const Erba = styled.img.withConfig({
	shouldForwardProp: (prop) => prop !== 'menuAttivo',
})`
    height: 210px;
	position: absolute;

	animation: ${({ menuAttivo, reverse }) => {
		if (!menuAttivo) {
			return css`${scomparsaErba} 4s ease forwards`;
		} else if (menuAttivo && reverse) {
			return css`${scomparsaErba} 3s ease reverse forwards`;
		} else {
			return 'none';
		}
	}};

	bottom: 0;

	z-index: 12;
`

// Creiamo componenti stilizzati
const MenuContainer = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== 'menuAttivo',
})`
	overflow: hidden;
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background: lightblue;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	transition: all 1s;
	z-index: 21;
	animation: ${({ menuAttivo, reverse }) => {
		if (!menuAttivo) {
			return css`${menuUp} 4s ease forwards`;
		} else if (menuAttivo && reverse) {
			return css`${menuUp} 3s ease reverse forwards`;
		} else {
			return 'none';
		}
	}};
`;

const Logo = styled.img.withConfig({
	shouldForwardProp: (prop) => prop !== 'menuAttivo',
})`
	position:relative;
	height: auto;
	bottom:-20px;
	width: 200px;
	right:0%;

	animation: ${({ menuAttivo, reverse }) => {
		if (!menuAttivo) {
			return css`${scomparsaLogo} 4s ease forwards`;
		} else if (menuAttivo && reverse) {
			return css`${scomparsaLogo} 3s ease reverse forwards`;
		} else {
			return 'none';
		}
	}};
`


// Poi modifichiamo il MenuElemento per adattarsi al nuovo stile
const MenuElemento = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== 'reverse',
})`
	margin: 10px;
	padding: 10px;
	cursor: pointer;
	transition: all 1s;
	color: black;
	z-index: 20;
	animation: ${({ menuAttivo, reverse }) => {

		if (!menuAttivo) {

			return css`${menuUpScritte} 7s ease forwards`;
		} else if (menuAttivo && reverse) {

			return css`${menuUpScritte} 6s ease forwards`;
		} else {

			return 'none';
		}
	}};
`;

//############################-- JAVASCRIPT --############################//
const MenuMagico = () => {
	const [menuAttivo, setMenuAttivo] = useState(true);
	const [reverse, setReverse] = useState(false);
	const [uniqueKey, setUniqueKey] = useState(Date.now());

	const selezionaPagina = (sezione) => {
		if (menuAttivo) {
			setUniqueKey(Date.now());

			setReverse(false)
			setMenuAttivo(false);
		}
		console.log(`Passando a: ${sezione}`);
	};

	const tronaAlMenu = () => {
		if (!menuAttivo) {
			// Genera una nuova chiave univoca per forzare il re-render del componente
			setUniqueKey(Date.now());

			// Imposta gli stati necessari per l'animazione
			setReverse(true);
			setMenuAttivo(true);
		}
	}

	const NuvolaComponent = ({ src, alt }) => {
		const proprietaNuvola = generaProprietaNuvola();
		return <Nuvola src={src} menuAttivo={menuAttivo} alt={alt} {...proprietaNuvola} />;
	};


	//############################-- HTML --############################//
	return (
		<>
			<MenuContainer key={uniqueKey} menuAttivo={menuAttivo} reverse={reverse}>
				<MenuElemento menuAttivo={menuAttivo} reverse={reverse} onClick={() => tronaAlMenu()}>
				<b>menu</b>
					{/* <Logo menuAttivo={menuAttivo} reverse={reverse} src={Logo_svg} alt="Sorry, your browser does not support inline SVG." /> */}
				</MenuElemento>
				<MenuElemento menuAttivo={menuAttivo} reverse={reverse} onClick={() => selezionaPagina('storia')}><b>La Mia Storia</b></MenuElemento>
				<MenuElemento menuAttivo={menuAttivo} reverse={reverse} onClick={() => selezionaPagina('cv')}><b>Scopri il Mio CV</b></MenuElemento>
				<MenuElemento menuAttivo={menuAttivo} reverse={reverse} onClick={() => selezionaPagina('servizi')}><b>Servizi</b></MenuElemento>
				<MenuElemento menuAttivo={menuAttivo} reverse={reverse} onClick={() => selezionaPagina('contatti')}><b>Contatti</b></MenuElemento>

				<Sole></Sole>

				<Erba menuAttivo={menuAttivo} reverse={reverse} src={Erba_svg} alt="Sorry, your browser does not support inline SVG." ></Erba>


				<NuvolaComponent src={Nuvola_svg} alt="Sorry, your browser does not support inline SVG." />
				<NuvolaComponent src={Nuvola_svg} alt="Sorry, your browser does not support inline SVG." />
				<NuvolaComponent src={Nuvola_svg} alt="Sorry, your browser does not support inline SVG." />
				<NuvolaComponent src={Nuvola_svg} alt="Sorry, your browser does not support inline SVG." />
				<NuvolaComponent src={Nuvola_svg} alt="Sorry, your browser does not support inline SVG." />
				<NuvolaComponent src={Nuvola_svg} alt="Sorry, your browser does not support inline SVG." />

				<NuvolaComponent src={Nuvola_svg} alt="Sorry, your browser does not support inline SVG." />
				<NuvolaComponent src={Nuvola_svg} alt="Sorry, your browser does not support inline SVG." />
				<NuvolaComponent src={Nuvola_svg} alt="Sorry, your browser does not support inline SVG." />
				<NuvolaComponent src={Nuvola_svg} alt="Sorry, your browser does not support inline SVG." />
				<NuvolaComponent src={Nuvola_svg} alt="Sorry, your browser does not support inline SVG." />
				<NuvolaComponent src={Nuvola_svg} alt="Sorry, your browser does not support inline SVG." />

				<Albero menuAttivo={menuAttivo} reverse={reverse}>
					<Albero_sup src={Albero_sup_svg} alt="Sorry, your browser does not support inline SVG." />
					<Albero_inf src={Albero_inf_svg} alt="Sorry, your browser does not support inline SVG." />
				</Albero>

				<Mongolfiera menuAttivo={menuAttivo} reverse={reverse} src={Mongolfiera_svg} alt="Sorry, your browser does not support inline SVG." />

			</MenuContainer>

		</>

	);
};

export default MenuMagico;