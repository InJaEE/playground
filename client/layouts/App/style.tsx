import styled from '@emotion/styled';

type MainWrapperProps = {
	isMain: boolean;
};

export const MainWrapper = styled.div<MainWrapperProps>`
	background-color: #f9f9f9;
	min-height: 100vh;
	padding-bottom: 5rem;
	${props => !props.isMain && 'padding-top: 7rem;'}
`;
