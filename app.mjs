import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import userRouter from "./routes/user.mjs";
import accountRouter from "./routes/account.mjs";

// in-memory 
global.users = [];

const app = express();

// Middleware to log the API endpoint being called
app.use((req, res, next) => {
    console.log(`API Start: ${req.method} ${req.url}`);

    res.on("finish", () => {
        console.log(`API End: ${req.method} ${req.url} - Status: ${res.statusCode}`);
    });

    next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/account", accountRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};


    res.status(err.status || 500);
    res.render("error");
});


app.listen(3000, () => {
    console.log("listen on port 3000")
})

export default app;
