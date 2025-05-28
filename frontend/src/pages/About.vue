    <template>
        <section class="about-section">
            <div class="heading">
                <span class="subheading">about us</span>
                <h2>Uncompromising Quality in Every Bite</h2>
            </div>

        <div class="row">
        <div class="about-content">
            <div class="image-container">
                <img src="../assets/images/taco-chefcartoon.png" alt="Chef Cartoon">
            </div>
            <div class="about-content-text">
                <p>Vedeshi Khana was founded in 2025 by Vishal Suthar and Sujata Nath, bringing the vibrant flavors
                    of global cuisine to the heart of India. What began as a passion for culinary excellence quickly
                    evolved into a full-fledged restaurant that celebrates the magic of Mexican cuisine with an
                    Indian twist.</p>
                <p>Our journey started in Bangalore, where our talented master chef meticulously recreated the
                    renowned recipes of Chef Quang, known for his exceptional Mexican-style dishes. These recipes
                    were not just recreated but were thoughtfully adapted to cater to the diverse and rich food
                    culture of India, ensuring that every dish maintains its authentic flavor while resonating with
                    the local palate.</p>
                <p>At Vedeshi Khana, we take pride in offering an extraordinary dining experience where every dish
                    tells a story. From sizzling tacos to rich burritos, tangy enchiladas, and flavorful
                    quesadillas, our menu is a blend of traditional Mexican ingredients and spices with a distinct
                    touch of Indian influence. Our team works tirelessly to ensure that every plate is not just a
                    meal but a journey of taste and authenticity</p>
                <p>Today, Vedeshi Khana is more than just a restaurant — it’s a place where food becomes an
                    experience. Serving cities like Ahmedabad, Mumbai, Pune, Shillong, and Sagwara, we continue to
                    expand our footprint, bringing our mouthwatering creations to a growing number of food lovers.
                    Whether you're dining in our cozy, vibrant spaces or enjoying the comfort of our home delivery
                    service, we guarantee an unforgettable meal that transports you to the heart of Mexican cuisine
                    with every bite.</p>
                <p>Our mission is simple: to deliver high-quality, flavorful dishes that bring people together. We
                    believe food is more than just sustenance; it's an experience, a culture, and a celebration of
                    life. That’s why at Vedeshi Khana, we’re committed to excellence, creativity, and a passion for
                    culinary art.</p>
            </div>
        </div>
    </div>


                <div class="row">
                    <div class="about-article">
                        <h3>food brings people together</h3>
                    </div>
                </div>

                <div class="row gallery">
                    <div class="wrapper">
                        <img src="../assets/images/taco/taco-2.jpg" alt="Taco" class="gallery-img">
                        <img src="../assets/images/taco/taco-4.jpg" alt="Taco" class="gallery-img">
                        <img src="../assets/images/burrito/burrito-6.jpg" alt="Burrito" class="gallery-img">
                        <img src="../assets/images/burrito/burrito-2.jpg" alt="Burrito" class="gallery-img">
                        <img src="../assets/images/burrito/burrito-3.jpg" alt="Burrito" class="gallery-img">
                        <img src="../assets/images/nachos/nachos-1.jpg" alt="Nachos" class="gallery-img">
                        <img src="../assets/images/nachos/nachos-2.jpg" alt="Nachos" class="gallery-img">
                        <img src="../assets/images/nachos/nachos-3.jpg" alt="Nachos" class="gallery-img">
                        <img src="../assets/images/dessert/dessert-2.jpg" alt="Dessert" class="gallery-img">
                        <img src="../assets/images/dessert/dessert-6.jpg" alt="Dessert" class="gallery-img">
                    </div>
                </div>
        </section>
    </template>

    <script>
    export default {
        name: "About",
    };
    </script>

    <style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

    .about-section {
        padding: 3rem 9%;
        background-color: #f9f9f8;
        font-family: 'Poppins', sans-serif;
    }

    /* Heading Styles */
    .heading {
        text-align: center;
        margin-bottom: 3rem;
        position: relative;
    }

    .heading .subheading {
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #27ae60; /* Only text color */
}



    .heading h2 {
        font-size: 2.5rem;
        color: #666666;
        font-weight: 700;
        position: relative;
        padding-bottom: 1rem;
        text-transform: uppercase;
    
    }

    .heading h2:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 3px;
        background-color: #fbfbfb;
    }

    /* About Content */
    .about-section .about-content {
        display: flex;
        width: 100%;
        margin-bottom: 3rem;
        background-color: #fff;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    }

    .about-section .about-content .image-container {
        flex: 0 0 40%;
        max-width: 40%;
        background-color: rgb(249, 249, 249);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        position: relative;
        overflow: hidden;
    }

    .about-section .about-content .image-container:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(39, 174, 96, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
    }

    .about-section .about-content .image-container img {
        max-width: 100%;
        transition: transform 0.5s ease;
    }

    .about-section .about-content .image-container:hover img {
        transform: scale(1.05);
    }

    .about-section .about-content .about-content-text {
        flex: 0 0 60%;
        max-width: 60%;
        padding: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .about-section .about-content .about-content-text p {
        font-size: 1.5rem;
        line-height: 2;
        color: #555;
        margin-bottom: 1.5rem;
    }

    .about-section .about-content .about-content-text p:last-child {
        margin-bottom: 0;
    }

    /* Tagline */
    .about-section .about-article {
        margin: 3rem 0;
        padding: 2rem;
        text-align: center;
        background-color: #27ae60;
        width: 100%;
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(39, 174, 96, 0.3);
        transform: translateY(0);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .about-section .about-article:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(39, 174, 96, 0.4);
    }

    .about-section .about-article h3 {
        font-family: 'Satisfy', cursive;
        font-size: 2.5rem;
        color: white;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    }

    /* Gallery */
    .about-section .gallery {
        overflow: hidden;
        padding: 4rem 2rem;
        position: relative;
    }

    .about-section .gallery:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(ellipse at center, rgba(39, 174, 96, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
        pointer-events: none;
    }

    .about-section .gallery .wrapper {
        position: relative;
        flex-grow: 1;
        margin: auto;
        max-width: 1200px;
        max-height: 1200px;
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-gap: 2vmin;
        justify-items: center;
        align-items: center;
    }

    .about-section .gallery .wrapper .gallery-img {
        z-index: 1;
        grid-column: span 2;
        max-width: 100%;
        margin-bottom: -52%;
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        transform: scale(1);
        transition: all .3s ease;
        border: 3px solid white;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    }

    .about-section .gallery .wrapper .gallery-img:nth-child(7n + 1) {
        grid-column: 2 / span 2;
    }

    .about-section .gallery .wrapper .gallery-img:hover {
        z-index: 2;
        transform: scale(2);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }

    /* Responsive Design */
    @media (max-width: 992px) {
        .about-section {
            padding: 2rem 5%;
        }

        .heading h2 {
            font-size: 2rem;
        }

        .about-section .about-article h3 {
            font-size: 2rem;
        }

        .about-section .about-content .about-content-text {
            padding: 2rem;
        }

        .about-section .about-content .about-content-text p {
            font-size: 1rem;
        }
    }

    @media (max-width: 768px) {
        .about-section .about-content {
            flex-direction: column;
        }

        .about-section .about-content .image-container {
            max-width: 100%;
            flex: 0 0 100%;
        }

        .about-section .about-content .image-container img {
            max-width: 250px;
        }

        .about-section .about-content .about-content-text {
            max-width: 100%;
            flex: 0 0 100%;
            padding: 2rem;
        }

        .about-section .gallery .wrapper .gallery-img:hover {
            transform: scale(2.5);
        }

        .about-section .about-article h3 {
            font-size: 1.8rem;
        }
    }

    @media (max-width: 576px) {
        .about-section {
            padding: 1.5rem 3%;
        }

        .heading .subheading {
            font-size: 0.8rem;
        }

        .heading h2 {
            font-size: 1.5rem;
        }

        .about-section .about-content .image-container {
            padding: 1rem;
        }

        .about-section .about-content .image-container img {
            width: 100%;
            max-width: 200px;
        }

        .about-section .about-content .about-content-text {
            padding: 1.5rem;
        }

        .about-section .about-content .about-content-text p {
            font-size: 0.9rem;
            line-height: 1.6;
        }

        .about-section .about-article {
            padding: 1.5rem 1rem;
            margin: 2rem 0;
        }

        .about-section .about-article h3 {
            font-size: 1.5rem;
        }

        .about-section .gallery {
            padding: 2rem 0;
        }

        .about-section .gallery .wrapper {
            grid-gap: 2vmin;
        }

        .about-section .gallery .wrapper .gallery-img:hover {
            transform: scale(2);
        }
    }
    </style>