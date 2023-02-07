<template>
    <div id="container">
        <aside>
            <header>
                <input type="text" placeholder="search">
            </header>
            <ul>
                <li>
                    <img src="https://cdn-icons-png.flaticon.com/512/2038/2038955.png" alt="">
                    <div>
                        <h2>TOPIC</h2>
                        <h3>
                            <span class="status orange"></span>
                            offline
                        </h3>
                    </div>
                </li>
                <li>
                    <img src="https://cdn-icons-png.flaticon.com/512/2038/2038955.png" alt="">
                    <div>
                        <h2>TOPIC</h2>
                        <h3>
                            <span class="status green"></span>
                            online
                        </h3>
                    </div>
                </li>
            </ul>
        </aside>
        <main>
            <header>
                <img src="https://cdn-icons-png.flaticon.com/512/2038/2038955.png" alt="">
                <div>
                    <h2>Admin</h2>
                </div>
            </header>
            <ul id="chat">
                <li class="you">
                    <div class="entete">
                        <span class="status green"></span>
                        <h2>ADMIN</h2>
                        <h3>10:12AM, Today</h3>
                    </div>
                    <div class="triangle"></div>
                    <div class="message">
                        TEST ADMIN
                    </div>
                </li>
                <li class="me">
                    <div class="entete">
                        <h3>10:12AM, Today</h3>
                        <h2>USER</h2>
                        <span class="status blue"></span>
                    </div>
                    <div class="triangle"></div>
                    <div class="message">
                        TEST USER
                    </div>
                </li>
            </ul>
            <footer>
                <textarea placeholder="message..."></textarea>
                <a href="#" style="float: right;">SEND</a>
            </footer>
        </main>
    </div>
</template>