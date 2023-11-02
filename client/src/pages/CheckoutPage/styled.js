import styled from "styled-components";

export const CheckoutStyled = styled.div`
width: 100%;
.content {
    width: 70%;
    margin: 40px auto;
}
`

export const TitleFields = styled.p`
font-size: 20px;
font-weight: 600;
margin-bottom: 20px;
border-color: #3333;
`

export const CheckoutItemStyled = styled.div`
display: flex;
justify-content: space-between;
margin-top: 20px;
align-items: center;
`

export const ButtonCheckOut = styled.button`
padding: 12px 20px;
font-size: 16px;
color: white;
background-color: #b5313a;
border-radius: 8px;
border-color: transparent;
&:hover {
    opacity: 0.9;
    cursor: pointer;
}
`