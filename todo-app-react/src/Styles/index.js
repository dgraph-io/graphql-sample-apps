import { createGlobalStyle, styled } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        boxSizing: border-box;
        text-decoration: none;
        outline: none;
        
        font-family: 'Helvetica';
    }
`;

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background: rgba(0,0,0,0.1);
    border-radius: 0px;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0px;

    .title{
        font-weight: 100;
        font-size: 48px;
        line-height: 72px;
        color: #ef255a;
        mix-blend-mode: normal;
    }
`;

export const Title = styled.h1`
    font-weight: 100;
    font-size: 45px;
    line-height: 24px;
    color: #EF255A;
    align-items: center;
    display: flex;

    font-family: 'Helvetica';
`;

export const Img = styled.img`
    width: 40px;
    height: 40px;
    margin-left: 12px;
`;

export const Paragraph = styled.p`
    font-weight: 100;
    font-size: 20px;
    line-height: 24px;
    color: #100c19;
    margin: 10px;

    font-family: 'Helvetica';
`;

export const Link = styled.a`
    &:hover {
        color: #ffffff;
    }
`;

export const Input = styled.input`
    margin-top: 12px;
    padding: 8px 24px;
    width: ${(props) => props.width || "224px"};
    height: 34px;
    background: #fffff;
    box-shadow: 0px 4px 4px rgba(0,0,0,0.25);
    border-radius: 6px;
    border: none;

    font-weight: 100;
    font-size: 20px;
    line-height: 24px;
    color: #100c19;

    font-family: 'Helvetica';

    &::placeholder{
        font-weight: 100;
        font-size: 20px;
        line-height: 24px;
        color: #e5e5e5;
    }
`;

export const Flex = styled.div`
    display: flex;
    flex-direction: ${(props) => props.direction || "column"};
    justify-content: ${(props) => props.justify || "center"};
    align-items: ${(props) => props.align || "center"};
    gap: ${(props) => props.gap || "16px"};
    height: ${(props) => props.height || "62px"};
`;

export const Spacer = styled.div`
    width: 100%;
    margin: ${(props) => props.margin || "20px"};
`;

export const Card = styled.div`
    border-radius: 6px;
    background-color: #ffffff;
    padding: 6px;
    min-height: 44px;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0,0,0,0.25);
    
`;

export const Button = styled.button`
    margin-top: 12px;
    width: ${(props) => props.width || "90px"};
    height: ${(props) => props.height || "50px"};
    background: #EF255A;
    border-radius: 6px;
    border: none;

    font-style: normal;
    font-weight: 100;
    font-size: 20px;
    line-height: 24px;
    color: #FBFBFB;
    box-shadow: 0px 4px 4px rgba(0,0,0,0.25);

    font-family: 'Helvetica';

    &:hover {
        opacity: 0.8;
    }

    &;active {
        opacity: 0.6;
    }
`;

export const List = styled.ul`
    margin: 0 auto;
    padding: 0px;
`;

export const Item = styled.li`
    padding: 12px;
    width: 600px;
    min-height: 50px;
    background: ${(props) => props.checked ? "#ef255a" : "#ffffff"};
    box-shadow: 0px; 4px; 4px; rgba(0,0,0,0.25);
    border-radius: 6px;
    list-style: none;
    display: ${(props) => props.flex || "flex"};
    align-items: ${(props) => props.align || "center"};
    justify-content: space-between;
    box-shadow: 0px 4px 4px rgba(0,0,0,0.25);
    flex-wrap: wrap;
    align-content: center;

    p {
        font-weight: 100;
        font-size: 20px;
        line-height: 24px;
        text-decoration-line: ${(props) => props.checked ? "line-through" : ""};
        color: ${(props) => props.checked ? "#ffffff" : "#100c19"};

        width: 70%;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word;
        
        margin: 10px 6px;
        font-family: 'Helvetica';
    }

    button {
        background: transparent;
        border: none;
        cursor: pointer;

        &:hover {
            opacity: 0.8;
        }

        &;active {
            opacity: 0.6;
        }
    }

    i{
        font-size: 24px;
        color: ${(props) => props.checked ? "#ffffff" : "#100c19"};  
    }
`;

export const CopyRight = styled.p`
    color: ${(props) => props.color || "#85868a"};
`; 