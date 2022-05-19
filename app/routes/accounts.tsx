import { HStack, useRadioGroup, VStack } from "@chakra-ui/react";
import { Page, RadioCard } from "~/components";

const Cash = () => {
  return (
    <div className="flex items-center justify-center border h-44 w-44">
      Cash
    </div>
  );
};

export default function Accounts() {
  const options = ["Cash", "Savings", "Card"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "Account",
    defaultValue: "Cash",
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <Page>
      <VStack alignItems={"flex-start"} spacing={8}>
        <h2 className="text-xl font-bold">Accounts</h2>
        <HStack>
          <HStack {...group}>
            {options.map((value) => {
              const radio = getRadioProps({ value });
              return (
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              );
            })}
          </HStack>
        </HStack>
      </VStack>
    </Page>
  );
}
