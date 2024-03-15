/* eslint-disable @typescript-eslint/no-var-requires */

const { fork } = require('node:child_process');

const { hookFork, waitOnExit } = require('@dotcom-tool-kit/logger');
const { Task } = require('@dotcom-tool-kit/types');

const toolId = 'rollup';
const binPath = require.resolve('.bin/rollup');

class Rollup extends Task {
	/**
	 * @param {any[]} args
	 */
	run(...args) {
		this.logger.info(`running ${toolId} ${args.join(' ')}`);

		const child = fork(`${binPath}`, ['-c'], { silent: true });
		hookFork(this.logger, 'build', child);

		return waitOnExit(toolId, child);
	}
}

class RollupDev extends Rollup {
	/**
	 * @param {any[]} args
	 */
	run(...args) {
		this.logger.info(`running ${toolId} ${args.join(' ')}`);

		const child = fork(`${binPath}`, ['-cw'], { silent: true });
		hookFork(this.logger, 'build', child);

		return waitOnExit(toolId, child);
	}
}

exports.tasks = [Rollup, RollupDev];
