import type { LoaderFunction, MetaFunction } from "@remix-run/server-runtime";

import { Button, Text, Flex, Heading, Stack, Image } from "@chakra-ui/react";
import { useFetcher } from "@remix-run/react";
import { BsGoogle, BsGithub } from "react-icons/bs";

import { authenticator } from "~/services/auth.service";

export const meta: MetaFunction = () => {
  return {
    title: "Money Manager | Sign up (or in)",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, { successRedirect: "/" });
  return null;
};

export default function Login() {
  const githubAuthFetcher = useFetcher();
  const googleAuthFetcher = useFetcher();

  const isGithubAuthenticating = githubAuthFetcher.state === "submitting";
  const isGoogleAuthenticating = googleAuthFetcher.state === "submitting";

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <div className="flex items-center justify-center flex-1 p-8">
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"} mb="4">
            Sign in to your account
          </Heading>
          <Stack spacing={4}>
            <githubAuthFetcher.Form
              action="/auth/github"
              method="post"
              className="w-full"
            >
              <Button
                isLoading={isGithubAuthenticating}
                loadingText="Authenticating"
                colorScheme={"telegram"}
                variant={"solid"}
                w="full"
                leftIcon={<BsGithub />}
                type="submit"
                disabled
              >
                Sign In (or up) with Github
              </Button>
            </githubAuthFetcher.Form>
            <Text textAlign="center" color="gray.300">
              Or
            </Text>
            <googleAuthFetcher.Form
              action="/auth/google"
              method="post"
              className="w-full"
            >
              <Button
                isLoading={isGoogleAuthenticating}
                loadingText="Authenticating"
                colorScheme={"telegram"}
                variant={"solid"}
                w="full"
                leftIcon={<BsGoogle />}
                type="submit"
              >
                Sign In (or up) with Google
              </Button>
            </googleAuthFetcher.Form>
          </Stack>
        </Stack>
      </div>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
