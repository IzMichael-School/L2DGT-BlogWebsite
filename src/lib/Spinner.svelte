<script lang="ts">
    // Pick random time to start animation at
    let rand = randomFloatBetween(0, 4, 2);

    // Function to pick random number between two values
    function randomFloatBetween(minValue: number, maxValue: number, precision: number){
        if (typeof(precision) == 'undefined') {
            precision = 2;
        };
        return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue).toFixed(precision));
    }
</script>

<div class="spinner" style="animation-delay: -{rand - 1}s;"></div>

<style>
    /* Pong animation elements, done using gradients */
    .spinner {
        width: 100%;
        height: 100%;
        border: 5px solid #fff;
        padding: 0 8px;
        background:
            linear-gradient(#000 0 0) 0 0/8px 20px,
            linear-gradient(#000 0 0) 100% 0/8px 20px,
            radial-gradient(farthest-side, #000 90%,#fff) 0 5px/8px 8px content-box,
            #fff;
        background-repeat: no-repeat; 
        animation: pong 4s infinite linear;
    }

    /* Pong animation */
    @keyframes pong {
        25% {
            background-position: 0 0, 100% 100%, 100% calc(100% - 5px);
        }
        50% {
            background-position: 0 100%, 100% 100%, 0 calc(100% - 5px);
        }
        75% {
            background-position: 0 100%, 100% 0, 100% 5px;
        }
    }
</style>