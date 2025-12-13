
import React from "react";
import styles from "../cssFiles/About.module.css";

const About = () => {
  return (
    <div className={styles.about_container}>
      <section className={styles.about_wrapper}>

        {/* HERO / STORY SECTION */}
        <section className={styles.about_hero}>
          <div className={styles.about_text}>
            <h1>Our Story</h1>
            <p>
              Cooking is more than just preparing food — it’s about memories,
              culture, and sharing joy. This platform was created to help
              home cooks discover, save, and enjoy recipes from around the world.
            </p>

            <p>
              Whether you are a beginner or someone who loves experimenting
              in the kitchen, our goal is to make cooking simple, enjoyable,
              and inspiring.
            </p>
          </div>

          <div className={styles.about_image} />
        </section>

        {/* MISSION SECTION */}
        <section className={styles.about_section}>
          <h2>Our Mission</h2>
          <p>
            To build a simple and beautiful recipe platform where anyone
            can learn, cook, and share their favorite dishes with confidence.
          </p>
        </section>

        {/* FEATURES / VALUES */}
        <section className={styles.about_cards}>
          <div className={styles.card}>
            <h3> Diverse Recipes</h3>
            <p>
              Explore recipes from different cuisines — from everyday meals
              to special dishes.
            </p>
          </div>

          <div className={styles.card}>
            <h3> Step-by-Step Guides</h3>
            <p>
              Clear instructions that help you cook with confidence,
              even if you are just starting out.
            </p>
          </div>

          <div className={styles.card}>
            <h3> Community Driven</h3>
            <p>
              Save recipes, create collections, and grow with a community
              of passionate home cooks.
            </p>
          </div>
        </section>

        {/* TECH / FOOTER NOTE */}
        <section className={styles.about_footer}>
          <p>🍽️ Recipes made simple 🍽️
          </p>
        </section>

      </section>
    </div>
  );
};

export default About;
