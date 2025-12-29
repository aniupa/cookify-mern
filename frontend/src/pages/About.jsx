import React from "react";
import styles from "../cssFiles/About.module.css";
import ScrollReveal from "../utils/animations/scrollReveal/ScrollReveal";

const About = () => {
  return (
    <div className={styles.about_container}>
      <section className={styles.about_wrapper}>
        {/* HERO / STORY SECTION */}
        <section className={styles.about_hero}>
          <div className={styles.about_text}>
            <ScrollReveal baseRotation={10} enableBlur blurStrength={20}>
              {" "}
              <h1>Our Story</h1>
            </ScrollReveal>

            <ScrollReveal enableBlur blurStrength={30}>
              <p className={styles.quote}>
                Cooking is more than just preparing food — it’s about memories,
                culture, and sharing joy.{" "}
              </p>{" "}
            </ScrollReveal>
            <ScrollReveal><p>
              {" "}
               Cookify was created for people who love food — whether you’re
              cooking your first meal or experimenting with flavors from around
              the world.
            </p></ScrollReveal>
            <ScrollReveal> <p>
              We believe recipes should be simple, beautiful, and accessible to
              everyone.
            </p></ScrollReveal>
            <ScrollReveal><p>
              Whether you are a beginner or someone who loves experimenting in
              the kitchen, our goal is to make cooking simple, enjoyable, and
              inspiring.
            </p></ScrollReveal>

            
          </div>

          <div className={styles.about_image} />
        </section>

        {/* MISSION SECTION */}
        <section className={styles.about_section}>
          <ScrollReveal baseRotation={5}>
          <h2>Our Mission</h2>
        </ScrollReveal>
         <ScrollReveal enableBlur blurStrength={15}>
          <p>
            To build a platform where cooking feels easy, inspiring, and fun —
            helping people cook confidently every single day.
          </p>
        </ScrollReveal>
        </section>

        {/* FEATURES / VALUES */}
        <section className={styles.about_cards}>
          {/* <ScrollReveal y={60}>
          <div className={styles.card}>
            <h3> Diverse Recipes</h3>
            <p>
              Explore recipes from different cuisines — from everyday meals to
              special dishes.
            </p>
          </div></ScrollReveal>

          <ScrollReveal y={60}>
          <div className={styles.card}>
            <h3> Step-by-Step Guides</h3>
            <p>
              Clear instructions that help you cook with confidence, even if you
              are just starting out.
            </p>
          </div></ScrollReveal>
          <ScrollReveal y={60}><div className={styles.card}>
            <h3> 💗 Save favorites</h3>
            <p>
              checkout favorite recipes of user world wide.
            </p>
          </div></ScrollReveal> */}

          
          <ScrollReveal y={60}>
    <div className={styles.card}>
      <h3> Save Favorite Recipes</h3>
      <p>
        Found a recipe you love? Save it instantly to your favorites and
        access it anytime from your personal collection.
      </p>
    </div>
  </ScrollReveal>

  <ScrollReveal y={60}>
    <div className={styles.card}>
      <h3> View Recipes by Everyone</h3>
      <p>
        Discover recipes shared by home cooks from all around the world.
        Learn, explore, and cook something new every day.
      </p>
    </div>
  </ScrollReveal>

  <ScrollReveal y={60}>
    <div className={styles.card}>
      <h3> Hand-Picked Home Highlights</h3>
      <p>
        The home page showcases curated and trending recipes so you
        always see something exciting the moment you visit.
      </p>
    </div>
  </ScrollReveal>

  <ScrollReveal y={60}>
    <div className={styles.card}>
      <h3> Cook Along With Videos</h3>
      <p>
        Click explore to watch step-by-step cooking videos and cook along
        in real time with easy-to-follow instructions.
      </p>
    </div>
  </ScrollReveal>

  <ScrollReveal y={60}>
    <div className={styles.card}>
      <h3> Secure Authentication</h3>
      <p>
        Create an account and log in securely. Only authenticated users
        can save recipes, upload content, and personalize their experience.
      </p>
    </div>
  </ScrollReveal>

  <ScrollReveal y={60}>
    <div className={styles.card}>
      <h3> Create & Share Your Own Recipes</h3>
      <p>
        Have a special dish? Upload your own recipe, share it with the
        community, and let others enjoy your creation.
      </p>
    </div>
  </ScrollReveal>
          

          
        </section>

        {/* TECH / FOOTER NOTE */}
        <ScrollReveal></ScrollReveal>
        <section className={styles.about_footer}>
          <p>-- Recipes made simple --</p>
        </section>
      </section>
    </div>
  );
};

export default About;
