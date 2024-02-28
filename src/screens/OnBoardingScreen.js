import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const OnboardingScreen = () => {
    const navigation = useNavigation();
    return (
        <Onboarding
            onSkip={() => navigation.replace("Update Profile")}
            onDone={() => navigation.replace("Update Profile")}
            pages={[
                {
                    backgroundColor: '#fef5ea',
                    image: <Image style={{
                        width: 200,
                        height: 200,
                    }} source={require('../../assets/icon.png')} />,
                    title: 'Welcome to Your Circle',
                    subtitle: `Enjoy the experience \n and have fun.`,
                },
            ]}
        />
    );
}

export default OnboardingScreen;