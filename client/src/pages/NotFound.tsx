import { Container, Title, Group, Button, Text, rem } from '@mantine/core';
import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

const classes: {
  root: CSSProperties,
  label: CSSProperties,
  description: CSSProperties,
  title: CSSProperties
} = {
  root: {
    paddingTop: "80px",
    paddingBottom: "80px"
  },
  description: {
    maxWidth: rem("500px"),
    margin: "auto",
    marginTop: "var(var(--mantine-spacing-xl))",
    marginBottom: "calc(1.5 * var(--mantine-spacing-xl))"
  },
  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem("38px"),
    lineHeight: 1,
    marginBottom: "calc(1.5 * var(--mantine-spacing-xl))",
    color: "var(--mantine-color-gray-2)",
  },
  title: {
    fontFamily: "var(--mantine-font-family)",
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem("38px")
  }
};

const NotFound = () => {
  return (
    <Container style={classes.root}>
      <div style={classes.label}>404</div>
      <Title style={classes.title}>You have found a secret place.</Title>
      <Text c="dimmed" size="lg" ta="center" style={classes.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
        been moved to another URL.
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md" component={Link} to={"/home"}>
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
};

export default NotFound; 