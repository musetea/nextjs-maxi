import Image from "next/image";
import classes from "@/styles/home/hero.module.scss";

const title = "Hi I'm T";
const description =
	"나는 백수다, 현재 UDEMY를 통해서 웹개발 관련 지식을 넓히고 있다. 언제까지. 백수를 탈출 할때까지..";

const Hero = () => {
	return (
		<section className={classes.hero}>
			<div className={classes.image}>
				<Image
					src={"/images/home/home.jpeg"}
					alt={""}
					width={300}
					height={300}
				/>
			</div>
			<h1>{title}</h1>
			<p>{description}</p>
		</section>
	);
};
export default Hero;
