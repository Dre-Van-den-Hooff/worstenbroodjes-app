import { Container } from "@chakra-ui/react";
import Footer from "../footer";
import { PageProps } from "../../interfaces";

const Page = ({ children, withFooter }: PageProps) => {
  return (
    <Container maxW="600px" p="0rem">
      {children}
      {withFooter && <Footer />}
    </Container>
  );
};

export default Page;
