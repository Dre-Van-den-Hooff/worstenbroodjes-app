import { Container } from "@mantine/core";
import Footer from "./footer";
import { PageProps } from "../interfaces";

const Page = ({ children }: PageProps) => {
  return (
    <Container sx={{ maxWidth: "1600px" }}>
      {children}
      <Footer />
    </Container>
  );
};

export default Page;
