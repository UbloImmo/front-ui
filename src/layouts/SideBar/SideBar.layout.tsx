import { StyleOverrideProps, TestIdProps } from "@types";
import type { SideBarLayoutDefaultProps, SideBarLayoutProps } from "./SideBar.types";
import { forwardRef } from "react";
import styled from "styled-components";

const defaultSideBarLayoutProps: SideBarLayoutDefaultProps = {
    children: null,
    restingWidth: "auto",
}

type Props = SideBarLayoutProps & TestIdProps & Omit<StyleOverrideProps, "as">;

export const SideBarLayout = forwardRef<HTMLElement, Props>((props, ref) => {

    return 
})

const SideBarContainer = styled.section`
`