/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import gulp from 'gulp';
import util from 'gulp-util';
import cache from 'gulp-cached';
import sequence from 'gulp-sequence';

import { destDir, jsPaths, jsModulePaths, resourcePaths, resourceModulePaths, igniteModulesTemp } from '../paths';

gulp.task('copy', (cb) => {
    const tasks = ['copy:resource', 'copy:ignite_modules:resource'];

    if (util.env.debug || util.env.sourcemaps) {
        tasks.push('copy:js');

        tasks.push('copy:ignite_modules:js');
    }

    return sequence(tasks, cb);
});

gulp.task('copy:js', () =>
    gulp.src(jsPaths, {base: './'})
        .pipe(cache('copy:js'))
        .pipe(gulp.dest(destDir))
);

gulp.task('copy:ignite_modules:js', () =>
    gulp.src(jsModulePaths)
        .pipe(cache('copy:ignite_modules:js'))
        .pipe(gulp.dest(`${destDir}/${igniteModulesTemp}`))
);

gulp.task('copy:resource', () =>
    gulp.src(resourcePaths)
        .pipe(gulp.dest(destDir))
);

gulp.task('copy:ignite_modules:resource', () =>
    gulp.src(resourceModulePaths)
        .pipe(gulp.dest(`${destDir}/ignite_modules`))
);
