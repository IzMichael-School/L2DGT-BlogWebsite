<script lang="ts">
    let rand = randomFloatBetween(0, 4, 2);
    function randomFloatBetween(minValue: number, maxValue: number, precision: number){
        if(typeof(precision) == 'undefined'){
            precision = 2;
        }
        return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue).toFixed(precision));
    }
</script>

<div class="spinner" style="animation-delay: -{rand - 1}s;"></div>

<style>
    /* .spinner {
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        background:#f03355;
        clip-path: polygon(0 0,100% 0,100% 100%,0 100%);
        animation: sh1 2s infinite cubic-bezier(0.3,1,0,1);
    }

    @keyframes sh1 {
        33% {
            border-radius: 0;
            background:#514b82;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
        66% {
            border-radius: 0;
            background:#ffa516;
            clip-path: polygon(50% 0, 50% 0, 100% 100%, 0 100%);
        }
    } */

    /* .spinner {
        width: 10rem;
        height: 10rem;
        --_g: no-repeat radial-gradient(circle closest-side,#000 90%,#0000);
        background: 
            var(--_g) 0    0,
            var(--_g) 0    100%,
            var(--_g) 100% 100%;
        background-size: 40% 40%;
        animation: d1 1s infinite linear;
    }

    @keyframes d1 {
        25% {
            background-position: 100% 0, 0 100%, 100% 100%
        }
        50% {
            background-position: 100% 0, 0 0, 100% 100%
        }
        75% {
            background-position: 100% 0, 0 0, 0 100%
        }
        100% {
            background-position: 100% 100%, 0 0 ,0 100%
        }
    } */

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
        animation: a3 4s infinite linear;
    }
    @keyframes a3 {
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