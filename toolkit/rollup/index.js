const { Task } = require('@dotcom-tool-kit/types');
const rollup = require('rollup');
const loadConfigFile = require('rollup/dist/loadConfigFile');
const path = require('path');

class Rollup extends Task {
	async run(opts, ...rest) {
		const config = path.join(process.cwd(), 'rollup.config.js');
		const { options, warnings } = await loadConfigFile(config);

		// print any config warnings to the console
		warnings.flush();

		for (const optionsEntry of options) {
			const bundle = await rollup.rollup(optionsEntry);
			await Promise.all(optionsEntry.output.map(bundle.write));
		}

		return options;
	}
}

const log = (...args) => console.log('[Rollup]', ...args)
class RollupAndWatch extends Rollup {
	async run() {
		super.run().then((options) => {
			log('Watching for file changes');
			const watcher = rollup.watch(options);

			watcher.on('change', (id) => {
				log(id, 'changed')
			});
			watcher.on('restart', () => {
				log('restarting')
			});
			watcher.on('close', () => {
        log('closing watcher')
			});
		});
	}
}

exports.tasks = [Rollup, RollupAndWatch];
