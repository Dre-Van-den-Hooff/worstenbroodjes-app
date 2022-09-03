import { Container } from "@chakra-ui/react";
import Footer from "./footer";
import { PageProps } from "../interfaces";

const Page = ({ children, withFooter }: PageProps) => {
  return (
    <Container maxW="1600px">
      {children}
      {withFooter && <Footer />}
    </Container>
  );
};

export default Page;
