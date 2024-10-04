import Head from "next/head";
import Link from "next/link"; // Import Link from Next.js
import Image from "next/image";
import { Inter } from "next/font/google";
import Grid from "@mui/material/Grid2";
import { Box, Typography, Button, TextField, Container } from "@mui/material"; // Use by LoginForm
import useBearStore from "@/store/useBearStore";

function Home() {
  return (
    <>
      <main>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
            backgroundColor: "#333",
            color: "white",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Logo</Typography>
          <Box>
            <Link href="#" passHref>
              <Button sx={{ color: "white", marginRight: "10px" }}>Report</Button>
            </Link>
            <Link href="#" passHref>
              <Button sx={{ color: "white", marginRight: "10px" }}>Conclusion</Button>
            </Link>
            <Link href="#" passHref>
              <Button sx={{ color: "white", marginRight: "10px" }}>Community</Button>
            </Link>
            <Link href="#" passHref>
              <Button sx={{ color: "white", marginRight: "10px" }}>Environment</Button>
            </Link>
            <Link href="#" passHref>
              <Button sx={{ color: "white", marginRight: "10px" }}>Contact</Button>
            </Link>
            <Link href="/login" passHref>
              <Button variant="outlined" sx={{ color: "white", borderColor: "white", marginRight: "10px" }}>
                Sign In
              </Button>
            </Link>
            <Link href="/signup" passHref>
              <Button variant="contained" sx={{ backgroundColor: "white", color: "black" }}>
                Register
              </Button>
            </Link>
          </Box>
        </Box>

        {/* Hero Section */}
        <Box
          sx={{
            height: "400px",
            backgroundImage: "url('/path_to_your_image.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: "bold" }}>
            Bhutan
          </Typography>
          <Typography variant="h5">Subtitle</Typography>
        </Box>

        {/* Main Content Section */}
        <Container sx={{ padding: "40px 0" }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="body1" paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <img
                src="/path_to_your_map_image.jpg"
                alt="Map"
                style={{ width: "200px", display: "block", margin: "0 auto" }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <img src="/path_to_image1.jpg" alt="Image 1" style={{ width: "100%", borderRadius: "10px" }} />
              <Typography align="center">Image 1</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <img src="/path_to_image2.jpg" alt="Image 2" style={{ width: "100%", borderRadius: "10px" }} />
              <Typography align="center">Image 2</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <img src="/path_to_image3.jpg" alt="Image 3" style={{ width: "100%", borderRadius: "10px" }} />
              <Typography align="center">Image 3</Typography>
            </Grid>
          </Grid>
        </Container>

        {/* Footer Section */}
        <Box sx={{ backgroundColor: "#333", color: "white", padding: "40px 20px" }}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="body2">© 2023 Your Website</Typography>
            </Grid>
            <Grid item>
              {/* Social media icons */}
              <Box>
                <Link href="#" sx={{ color: "white", marginRight: "16px" }}>
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link href="#" sx={{ color: "white", marginRight: "16px" }}>
                  <i className="fab fa-youtube"></i>
                </Link>
                <Link href="#" sx={{ color: "white", marginRight: "16px" }}>
                  <i className="fab fa-linkedin"></i>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </main>
    </>
  );
}

export default Home;