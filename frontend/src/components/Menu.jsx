import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

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

// Creiamo componenti stilizzati
const MenuContainer = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== 'menuAttivo',
})`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 1s;
  z-index: 1000;
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

// Poi modifichiamo il MenuElemento per adattarsi al nuovo stile
const MenuElemento = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== 'reverse',
})`
  margin: 10px;
  padding: 10px;
  cursor: pointer;
  transition: all 1s;
  color: black;

  animation: ${({ menuAttivo, reverse }) => {
		console.log(menuAttivo, reverse);
		if (!menuAttivo) {
			console.log(1);
			return css`${menuUpScritte} 7s ease forwards`;
		} else if (menuAttivo && reverse) {
			console.log(2);
			return css`${menuUpScritte} 6s ease forwards`;
		} else {
			console.log(3);
			return 'none';
		}
	}};
`;


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

	return (
		<MenuContainer key={uniqueKey} menuAttivo={menuAttivo} reverse={reverse}>
			<MenuElemento menuAttivo={menuAttivo} reverse={reverse} onClick={() => tronaAlMenu()}>menu</MenuElemento>
			<MenuElemento menuAttivo={menuAttivo} reverse={reverse} onClick={() => selezionaPagina('storia')}>La Mia Storia</MenuElemento>
			<MenuElemento menuAttivo={menuAttivo} reverse={reverse} onClick={() => selezionaPagina('cv')}>Scarica il Mio CV</MenuElemento>
			<MenuElemento menuAttivo={menuAttivo} reverse={reverse} onClick={() => selezionaPagina('servizi')}>Servizi</MenuElemento>
			<MenuElemento menuAttivo={menuAttivo} reverse={reverse} onClick={() => selezionaPagina('progetti')}>Progetti</MenuElemento>
		</MenuContainer>
	);
};

export default MenuMagico;